import { NextApiResponse } from 'next'

export interface ApiError extends Error {
  statusCode?: number
}

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const ERROR_MESSAGES = {
  METHOD_NOT_ALLOWED: 'Method not allowed',
  EMAIL_ALREADY_REGISTERED: 'Email already registered',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const

export function handleApiError(
  res: NextApiResponse,
  error: Error | ApiError | unknown
): void {
  console.error('API Error:', error)

  if (error instanceof Error) {
    const statusCode =
      (error as ApiError).statusCode ||
      (error.message === ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED
        ? HTTP_STATUS.CONFLICT
        : HTTP_STATUS.BAD_REQUEST)

    res.status(statusCode).json({
      message: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    return
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
}

export function validateHttpMethod(
  res: NextApiResponse,
  method: string,
  allowedMethods: string[]
): boolean {
  if (!allowedMethods.includes(method)) {
    res.setHeader('Allow', allowedMethods)
    res
      .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
      .end(ERROR_MESSAGES.METHOD_NOT_ALLOWED)
    return false
  }
  return true
}
