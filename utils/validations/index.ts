// Password validation regex patterns
const PASSWORD_PATTERNS = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
} as const

// Email validation regex pattern
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 && // At least 8 characters
    PASSWORD_PATTERNS.uppercase.test(password) && // At least one uppercase letter
    PASSWORD_PATTERNS.lowercase.test(password) && // At least one lowercase letter
    PASSWORD_PATTERNS.number.test(password) && // At least one number
    PASSWORD_PATTERNS.special.test(password) // At least one special character
  )
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!PASSWORD_PATTERNS.uppercase.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!PASSWORD_PATTERNS.lowercase.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!PASSWORD_PATTERNS.number.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!PASSWORD_PATTERNS.special.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
