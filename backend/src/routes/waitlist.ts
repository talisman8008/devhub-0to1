import { createHash } from 'node:crypto'
import { Router } from 'express'
import { ApiError } from '../errors.js'
import { checkLimit, getClientIp, rateLimit, setRateLimitHeaders } from '../rate-limit.js'
import { getSupabaseServiceClient } from '../supabase.js'
import { waitlistBodySchema } from '../validation.js'
import { requireSupabaseConfig } from '../config.js'

export const waitlistRouter = Router()

waitlistRouter.post(
  '/',
  rateLimit({ keyPrefix: 'waitlist', max: 5, windowMs: 15 * 60 * 1000 }),
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
        source: 'landing_page',
        ip_hash: ipHash
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
        message: "You're on the waitlist! We'll be in touch."
      })
    } catch (error) {
      return next(error)
    }
  }
)

waitlistRouter.all('/', (_request, _response, next) => {
  next(new ApiError(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.'))
})

function hashIp(ip: string) {
  const { ipHashSalt } = requireSupabaseConfig()
  return createHash('sha256').update(`${ip}:${ipHashSalt}`).digest('hex')
}
