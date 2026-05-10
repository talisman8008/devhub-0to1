import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export type ErrorCode =
  | 'INVALID_JSON'
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_EMAIL'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'METHOD_NOT_ALLOWED'
  | 'NOT_FOUND'

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ErrorCode,
    message: string
  ) {
    super(message)
  }
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return response.status(error.status).json({
      success: false,
      code: error.code,
      message: error.message
    })
  }

  if (error instanceof ZodError) {
    return response.status(422).json({
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Please check the form details and try again.'
    })
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({
      success: false,
      code: 'INVALID_JSON',
      message: 'Invalid request body.'
    })
  }

  if (isBodyParserError(error)) {
    return response.status(error.status === 413 ? 413 : 400).json({
      success: false,
      code: 'INVALID_JSON',
      message: 'Invalid request body.'
    })
  }

  console.error('Unhandled API error:', error)

  return response.status(500).json({
    success: false,
    code: 'SERVER_ERROR',
    message: 'Something went wrong on our end. Please try again.'
  })
}

function isBodyParserError(error: unknown): error is { status?: number; type?: string } {
  if (!error || typeof error !== 'object') return false

  const maybeBodyParserError = error as { type?: unknown; status?: unknown }
  return typeof maybeBodyParserError.type === 'string' && typeof maybeBodyParserError.status === 'number'
}
