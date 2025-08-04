import { z } from 'zod'

const nameSchema = z
  .string()
  .min(2, { message: 'Must be at least 2 characters' })
  .max(50, { message: 'Must be at most 50 characters' })
  .regex(/^[a-zA-Z\s-']+$/, {
    message: 'Can only contain letters, spaces, hyphens, and apostrophes',
  })
  .transform((str) =>
    str
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  )

const passwordSchema = z
  .string()
  .min(8, { message: 'Must be at least 8 characters' })
  .max(100, { message: 'Must be at most 100 characters' })
  .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Must contain at least one number' })
  .regex(/[\W_]/, { message: 'Must contain at least one special character' })

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email address' })
    .transform((str) => str.toLowerCase().trim()),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const signupSchema = z
  .object({
    firstName: nameSchema.describe('First Name'),
    lastName: nameSchema.describe('Last Name'),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Must be a valid email address' })
      .transform((str) => str.toLowerCase().trim()),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
