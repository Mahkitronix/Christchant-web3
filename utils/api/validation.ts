import { z } from 'zod'

export interface ValidationError {
  field: string
  message: string[]
}

export function validateRequest<T>(
  schema: z.ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors: ValidationError[] = []
    const formattedErrors = result.error.format()

    Object.keys(formattedErrors).forEach((path) => {
      if (path === '_errors') return
      const fieldError = formattedErrors[path as keyof typeof formattedErrors]
      if (
        fieldError &&
        typeof fieldError === 'object' &&
        '_errors' in fieldError &&
        Array.isArray(fieldError._errors) &&
        fieldError._errors.length > 0
      ) {
        errors.push({
          field: path,
          message: fieldError._errors,
        })
      }
    })

    return { success: false, errors }
  }

  return { success: true, data: result.data }
}
