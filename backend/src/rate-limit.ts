import type { NextFunction, Request, Response } from 'express'

type RateRecord = {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateRecord>()
const MAX_BUCKETS_BEFORE_PRUNE = 10_000

export function getClientIp(request: Request) {
  const trustProxy = Boolean(request.app.get('trust proxy'))

  if (trustProxy) {
    const cloudflareIp = request.header('cf-connecting-ip')?.trim()
    return cloudflareIp || request.ip || request.socket.remoteAddress || 'unknown'
  }

  return request.socket.remoteAddress || request.ip || 'unknown'
}

export function checkLimit(key: string, max: number, windowMs: number) {
  const now = Date.now()
  pruneExpiredBuckets(now)

  const record = buckets.get(key)

  if (!record || now > record.resetAt) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })

    return {
      allowed: true,
      limit: max,
      remaining: Math.max(max - 1, 0),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000)
    }
  }

  if (record.count >= max) {
    return {
      allowed: false,
      limit: max,
      remaining: 0,
      resetAt: record.resetAt,
      retryAfterSeconds: Math.max(Math.ceil((record.resetAt - now) / 1000), 1)
    }
  }

  record.count += 1

  return {
    allowed: true,
    limit: max,
    remaining: Math.max(max - record.count, 0),
    resetAt: record.resetAt,
    retryAfterSeconds: Math.max(Math.ceil((record.resetAt - now) / 1000), 1)
  }
}

export function rateLimit(options: { keyPrefix: string; max: number; windowMs: number }) {
  return (request: Request, response: Response, next: NextFunction) => {
    const ip = getClientIp(request)
    const result = checkLimit(`${options.keyPrefix}:ip:${ip}`, options.max, options.windowMs)

    setRateLimitHeaders(response, result)

    if (!result.allowed) {
      return response.status(429).json({
        success: false,
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again in a few minutes.'
      })
    }

    return next()
  }
}

type RateLimitResult = ReturnType<typeof checkLimit>

export function setRateLimitHeaders(response: Response, result: RateLimitResult) {
  response.setHeader('X-RateLimit-Limit', String(result.limit))
  response.setHeader('X-RateLimit-Remaining', String(result.remaining))
  response.setHeader('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))

  if (!result.allowed) {
    response.setHeader('Retry-After', String(result.retryAfterSeconds))
  }
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < MAX_BUCKETS_BEFORE_PRUNE) return

  for (const [key, record] of buckets.entries()) {
    if (now > record.resetAt) {
      buckets.delete(key)
    }
  }
}
