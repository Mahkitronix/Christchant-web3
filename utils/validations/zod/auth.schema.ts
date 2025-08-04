import { z } from 'zod'

// Base schemas
const baseEmailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email format')

const basePasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  )

// Frontend schemas (for form validation)
export const frontendLoginSchema = z.object({
  email: baseEmailSchema,
  password: basePasswordSchema,
})

export const frontendSignupSchema = z
  .object({
    email: baseEmailSchema,
    password: basePasswordSchema,
    confirmPassword: z.string({
      required_error: 'Please confirm your password',
    }),
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(2, 'First name must be at least 2 characters')
      .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(2, 'Last name must be at least 2 characters')
      .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// API schemas (for request validation)
export const apiLoginSchema = z.object({
  email: baseEmailSchema,
  password: z.string({ required_error: 'Password is required' }),
})

export const apiSignupSchema = z.object({
  email: baseEmailSchema,
  password: basePasswordSchema,
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
})

// Types
export type FrontendLoginInput = z.infer<typeof frontendLoginSchema>
export type FrontendSignupInput = z.infer<typeof frontendSignupSchema>
export type ApiLoginInput = z.infer<typeof apiLoginSchema>
export type ApiSignupInput = z.infer<typeof apiSignupSchema>
