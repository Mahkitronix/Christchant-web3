import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormHeader,
  TextInput,
  EmailInput,
  PasswordInput,
} from '@/components/_sharable/form'
import { signupSchema, type SignupFormData } from '@/validations/auth.validation'
import { useUserAuth } from '@/hooks/useUserAuth'

export default function SignupForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

const { login } = useUserAuth({
  redirectTo: '/', // Redirect to home page after successful login
  requireActive: true,
})
  
  

  async function onSubmit(values: SignupFormData, event?: React.FormEvent) {
    event?.preventDefault(); // Prevent default form submission
    console.log('Form submitted with values:', values);
    try {
      console.log('Setting isSubmitting to true');
      setIsSubmitting(true);
      setServerError('');
      
      // Prepare the request data for user registration
      console.log('Preparing registration data');
      const requestData = {
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.username, // Using username as first name for simplicity
        lastName: '' // Empty last name as it's not in the form
      };
      
      console.log('Sending signup request with data:', requestData);
      
      try {
        // Log the URL being called
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const endpoint = '/api/auth/register';
        console.log('API URL:', `${apiUrl}${endpoint}`);
        
        // Call the signup API endpoint directly with fetch for better error handling
        console.log('Making API request to:', `${apiUrl}${endpoint}`);
        const response = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          let errorData: any;
          try {
            errorData = await response.json();
            console.error('Error response:', errorData);
          } catch (e) {
            console.error('Failed to parse error response:', e);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          throw errorData;
        }
        
        const responseData = await response.json();
        console.log('Signup successful, attempting auto-login:', responseData);
        
        // Auto-login after successful registration
        try {
          await login({
            email: values.email,
            password: values.password,
          });
          // If login is successful, the user will be redirected to the home page
          // as specified in the useUserAuth options
        } catch (loginError) {
          console.error('Auto-login failed, redirecting to sign-in page:', loginError);
          // If auto-login fails, redirect to sign-in page with a message
          router.push('/auth/sign-in?registered=true');
        }
      } catch (error: any) {
        console.error('Detailed signup error:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to the server. Please make sure the backend is running on http://localhost:3000');
        }
        // Re-throw the error to be caught by the outer catch block
        throw error;
      }
    } catch (error: any) {
      const errorInfo = {
        message: error?.message || 'Unknown error during signup',
        name: error?.name || 'Error',
        stack: error?.stack,
        response: error?.response,
        status: error?.status,
        data: error?.data,
      };
      console.error('Signup error:', errorInfo);
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        
        if (status === 400) {
          // Handle validation errors
          if (data.errors) {
            Object.entries(data.errors).forEach(([field, messages]) => {
              const message = Array.isArray(messages) ? messages[0] : messages;
              if (['username', 'email', 'password', 'confirmPassword'].includes(field)) {
                setError(field as keyof SignupFormData, {
                  type: 'manual',
                  message: message as string
                });
              } else {
                setServerError(message as string);
              }
            });
          } else {
            setServerError(data.message || 'Invalid request. Please check your input.');
          }
        } else if (status === 422) {
          // Handle validation errors (Laravel style)
          if (data.errors) {
            Object.entries(data.errors).forEach(([field, messages]) => {
              const message = Array.isArray(messages) ? messages[0] : messages;
              setError(field as keyof SignupFormData, {
                type: 'manual',
                message: message as string
              });
            });
          }
        } else {
          setServerError(data?.message || 'An error occurred during registration.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setServerError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setServerError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      console.log('Setting isSubmitting to false in finally block');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <FormHeader
          title="Create an account"
          description="Enter your details to create an account"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {serverError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">{serverError}</div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit((data) => onSubmit(data, e))();
          }}>
            <div className="space-y-4">

              <TextInput
                name="username"
                label="Username"
                placeholder="johndoe"
                control={control}
                error={errors.username?.message as string | undefined}
                isRequired
              />

              <EmailInput
                name="email"
                label="Email"
                placeholder="john@example.com"
                control={control}
                error={errors.email?.message as string | undefined}
                isRequired
              />

              <PasswordInput
                name="password"
                label="Password"
                placeholder="••••••••"
                control={control}
                error={errors.password?.message as string | undefined}
                isRequired
              />

              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                control={control}
                error={errors.confirmPassword?.message as string | undefined}
                isRequired
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
