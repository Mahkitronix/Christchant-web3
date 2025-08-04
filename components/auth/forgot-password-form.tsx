import React from 'react'
import { FormActionButton } from '@/components/_sharable/form'
import { UserRole } from '@/types/user'

interface ForgotPasswordFormProps {
  userType?: UserRole
  onSubmit: (email: string) => Promise<void>
  isLoading?: boolean
}

export default function ForgotPasswordForm({
  onSubmit,
  isLoading = false,
}: ForgotPasswordFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    await onSubmit(email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-8">
      {/* <EmailInput
        control={control}
        name="email"
        label="Email"
        isRequired
        placeholder="Enter your email address"
      /> */}
      <FormActionButton
        text="Reset Password"
        htmlType="submit"
        className="w-full"
        isLoading={isLoading}
        loadingText="Sending reset instructions..."
      />
    </form>
  )
}
