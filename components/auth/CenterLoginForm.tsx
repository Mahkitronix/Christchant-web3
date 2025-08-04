import {
  FormActionButton,
  EmailInput,
  PasswordInput,
  Form,
  FormHeader,
} from '@/components/_sharable/form'
import { loginSchema, LoginFormData } from '@/validations/auth.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserAuth } from '@/hooks/useUserAuth'
import { LoginFormProps } from '@/types/components'
import { useForm } from 'react-hook-form'

export default function CenterLoginForm({ redirect }: LoginFormProps) {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { login } = useUserAuth({
    redirectTo: redirect || '/center/dashboard',
    requireVerified: true,
    requireActive: true,
  })

  async function onSubmit(values: LoginFormData) {
    try {
      await login({ ...values })
    } catch (res: any) {
      const errors = res?.errors || []
      errors.forEach(
        ({ field, message }: { field: string; message: string }) => {
          if (field === 'email' || field === 'password') {
            setError(field, { type: 'manual', message })
          } else {
            setError('root', {
              type: 'serverError',
              message: message || 'Invalid credentials',
            })
          }
        }
      )
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title="Admin Login"
        description="Please sign in to access the admin dashboard"
      />

      <EmailInput
        label="Email"
        placeholder="Type your email here..."
        error={errors.email?.message}
        control={control}
        isRequired={true}
        name="email"
        variant="bordered"
      />

      <PasswordInput
        label="Password"
        placeholder="Type your password here..."
        isRequired={true}
        error={errors.password?.message}
        control={control}
        name="password"
        variant="bordered"
      />

      <FormActionButton
        text="Login"
        variant="solid"
        htmlType="submit"
        className="mt-2 w-full"
        isLoading={isSubmitting}
        loadingText="Logging in..."
        disabled={isSubmitting}
      />
    </Form>
  )
}
