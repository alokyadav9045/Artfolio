import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting for development
// In production, use Redis or Upstash KV
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export async function rateLimitMiddleware(request: NextRequest) {
  // Rate limit based on IP address
  const ip = request.headers.get('x-forwarded-for') ??
             request.headers.get('x-real-ip') ??
             '127.0.0.1'

  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100 // Increased from 5 to 100 requests per minute

  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
  } else if (userLimit.count >= maxRequests) {
    const resetTime = new Date(userLimit.resetTime)
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((userLimit.resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toISOString(),
        }
      }
    )
  } else {
    userLimit.count++
  }

  // Add rate limit headers to successful requests
  const currentLimit = rateLimitMap.get(ip)!
  const remaining = Math.max(0, maxRequests - currentLimit.count)
  const resetTime = new Date(currentLimit.resetTime)

  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', maxRequests.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', resetTime.toISOString())

  return response
}