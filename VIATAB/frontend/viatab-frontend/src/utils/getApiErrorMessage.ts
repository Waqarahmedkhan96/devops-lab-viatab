import type { ApiErrorResponse } from '../types'

type ApiError = {
  response?: {
    data?: ApiErrorResponse
  }
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong.',
): string {
  const apiError = error as ApiError
  const data = apiError.response?.data

  if (data?.message && data.message.trim().length > 0) {
    return data.message
  }

  if (data?.validationErrors) {
    const validationMessages = Object.values(data.validationErrors)
    if (validationMessages.length > 0) {
      return validationMessages.join(', ')
    }
  }

  return fallback
}