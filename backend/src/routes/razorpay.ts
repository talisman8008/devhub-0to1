import { createHash, createHmac } from 'node:crypto'
import { Router } from 'express'
import Razorpay from 'razorpay'
import { ApiError } from '../errors.js'
import { checkLimit, getClientIp, rateLimit, setRateLimitHeaders } from '../rate-limit.js'
import { getSupabaseServiceClient } from '../supabase.js'
import { waitlistBodySchema } from '../validation.js'
import { requireRazorpayConfig, requireSupabaseConfig } from '../config.js'

export const razorpayRouter = Router()

// Initialize Razorpay client
function getRazorpayClient() {
  const { key_id, key_secret } = requireRazorpayConfig()
  return new Razorpay({ key_id, key_secret })
}

razorpayRouter.post(
  '/create-order',
  rateLimit({ keyPrefix: 'razorpay_order', max: 5, windowMs: 15 * 60 * 1000 }),
  async (request, response, next) => {
    try {
      if (!request.is('application/json')) {
        throw new ApiError(400, 'INVALID_JSON', 'Invalid request body.')
      }

      const body = waitlistBodySchema.parse(request.body)
      const emailLimit = checkLimit(`waitlist:email:${body.email}`, 3, 60 * 60 * 1000)
      setRateLimitHeaders(response, emailLimit)

      if (!emailLimit.allowed) {
        throw new ApiError(429, 'RATE_LIMITED', 'Too many requests. Please try again in a few minutes.')
      }

      if (body.paymentPlan === 'group_discount') {
        // Group discount bypassed, they negotiate later
        return response.status(200).json({
          success: true,
          type: 'bypass',
          message: 'Group discount selected. No payment required right now.'
        })
      } else if (body.paymentPlan === 'monthly') {
        // Create Subscription
        const rzp = getRazorpayClient()
        if (!process.env.RAZORPAY_PLAN_ID) {
           throw new ApiError(500, 'SERVER_ERROR', 'Monthly plan ID not configured on server.')
        }
        
        const subscription = await rzp.subscriptions.create({
          plan_id: process.env.RAZORPAY_PLAN_ID,
          total_count: 6,
          customer_notify: 1,
        })
        
        return response.status(200).json({
          success: true,
          type: 'subscription',
          subscription_id: subscription.id
        })

      } else {
        // Standard one-time payment of 5499 INR (amount is in paise)
        const amount = 549900
        const rzp = getRazorpayClient()
        
        const order = await rzp.orders.create({
          amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        })

        return response.status(200).json({
          success: true,
          type: 'order',
          order_id: order.id,
          amount: order.amount,
          currency: order.currency
        })
      }
    } catch (error) {
      return next(error)
    }
  }
)

razorpayRouter.post(
  '/verify',
  rateLimit({ keyPrefix: 'razorpay_verify', max: 10, windowMs: 15 * 60 * 1000 }),
  async (request, response, next) => {
    try {
      const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_subscription_id,
        razorpay_signature,
        formData
      } = request.body

      if (!formData) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'Missing form data.')
      }

      const body = waitlistBodySchema.parse(formData)
      const { key_secret } = requireRazorpayConfig()

      // Determine verification based on order or subscription
      let generated_signature = ''
      if (razorpay_order_id) {
         generated_signature = createHmac('sha256', key_secret)
          .update(razorpay_order_id + '|' + razorpay_payment_id)
          .digest('hex')
      } else if (razorpay_subscription_id) {
         generated_signature = createHmac('sha256', key_secret)
          .update(razorpay_payment_id + '|' + razorpay_subscription_id)
          .digest('hex')
      } else {
        if (body.paymentPlan !== 'group_discount') {
           throw new ApiError(400, 'VALIDATION_ERROR', 'Missing payment IDs.')
        }
      }

      if (body.paymentPlan !== 'group_discount') {
        if (generated_signature !== razorpay_signature) {
          throw new ApiError(400, 'INVALID_SIGNATURE', 'Payment verification failed.')
        }
      }

      const clientIp = getClientIp(request)
      const ipHash = hashIp(clientIp)
      const supabase = getSupabaseServiceClient()

      const { error } = await supabase.from('waitlist').insert({
        email: body.email,
        full_name: body.fullName,
        contact_number: body.contactNumber,
        college_name: body.collegeName,
        city: body.city,
        course_background: body.courseBackground,
        area_of_interest: body.areaOfInterest,
        why_join: body.whyJoin,
        skill_level: body.skillLevel,
        solo_or_team: body.soloOrTeam,
        source: 'landing_page',
        ip_hash: ipHash,
        razorpay_payment_id: razorpay_payment_id || null,
        razorpay_order_id: razorpay_order_id || razorpay_subscription_id || null,
        payment_plan: body.paymentPlan || null
      })

      if (error?.code === '23505') {
        throw new ApiError(409, 'DUPLICATE_EMAIL', "You're already on the waitlist! We'll notify you when Cohort 2025 opens.")
      }

      if (error) {
        console.error('Supabase insert error:', error.message)
        throw new ApiError(500, 'SERVER_ERROR', 'Something went wrong on our end. Please try again.')
      }

      return response.status(201).json({
        success: true,
        message: "You're successfully registered!"
      })
    } catch (error) {
      return next(error)
    }
  }
)

function hashIp(ip: string) {
  const { ipHashSalt } = requireSupabaseConfig()
  return createHash('sha256').update(`${ip}:${ipHashSalt}`).digest('hex')
}
