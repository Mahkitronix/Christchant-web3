import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormHeader,
  EmailInput,
  PasswordInput,
} from '@/components/_sharable/form';
import { loginSchema, type LoginFormData } from '@/validations/auth.validation';
import { useUserAuth } from '@/hooks/useUserAuth';

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useUserAuth({
    redirectTo: '/', // Redirect to home page after successful login
  });

  async function onSubmit(values: LoginFormData, event?: React.FormEvent) {
    event?.preventDefault();
    console.log('Form submitted with values:', values);
    
    try {
      console.log('Setting isSubmitting to true');
      setIsSubmitting(true);
      setServerError('');
      
      console.log('Preparing login data');
      const loginData = {
        email: values.email.trim(),
        password: values.password,
      };
      
      console.log('Attempting login with data:', { ...loginData, password: '[REDACTED]' });
      
      try {
        console.log('Attempting to call login function with:', { email: loginData.email });
        const result = await login(loginData);
        console.log('Login successful, response:', result);
        console.log('Login successful, redirecting...');
      } catch (error: any) {
        console.group('Login Error Details');
        console.error('Error object:', error);
        console.error('Error name:', error?.name);
        console.error('Error message:', error?.message);
        console.error('Error status:', error?.status);
        console.error('Error response:', error?.response);
        console.error('Error stack:', error?.stack);
        
        // Log additional error details if available
        if (error?.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
          console.error('Response headers:', error.response.headers);
        }
        
        // Handle different types of errors
        if (error?.isValidationError && error.validationErrors) {
          console.log('Handling validation error');
          const errorMessages = error.validationErrors
            .map((err: any) => `${err.field ? `${err.field}: ` : ''}${err.message}`)
            .join('\n');
          setServerError(errorMessages || 'Please check your input and try again.');
        } 
        // Handle API response errors
        else if (error?.response?.data) {
          console.log('Handling API response error');
          const { data } = error.response;
          
          if (data.errors) {
            const errorMessages = Object.entries(data.errors)
              .map(([field, messages]) => {
                const message = Array.isArray(messages) ? messages[0] : messages;
                return `${field}: ${message}`;
              })
              .join('\n');
            setServerError(errorMessages || 'Validation error occurred');
          } else if (data.message) {
            setServerError(
              Array.isArray(data.message) 
                ? data.message.join('\n')
                : data.message
            );
          } else {
            setServerError(`Server error (${error.response.status}): ${error.response.statusText}`);
          }
        } 
        // Handle network errors
        else if (error?.message?.includes('Network Error')) {
          console.error('Network error detected');
          setServerError('Unable to connect to the server. Please check your internet connection and try again.');
        } 
        // Handle HTTP status codes
        else if (error?.status) {
          console.log('Handling HTTP status error:', error.status);
          switch (error.status) {
            case 400:
              setServerError('Invalid request. Please check your input and try again.');
              break;
            case 401:
              setServerError('Invalid email or password. Please try again.');
              break;
            case 403:
              setServerError('You do not have permission to access this resource.');
              break;
            case 404:
              setServerError('The requested resource was not found.');
              break;
            case 500:
              setServerError('A server error occurred. Please try again later.');
              break;
            default:
              setServerError(`An error occurred (${error.status}). Please try again.`);
          }
        } 
        // Handle other error cases
        else if (error?.message) {
          console.log('Handling general error with message');
          setServerError(error.message);
        } 
        // Fallback for any other errors
        else {
          console.log('Handling unknown error');
          setServerError('An unexpected error occurred. Please try again.');
        }
        
        console.groupEnd();
      }
    } catch (error: any) {
      // Any unhandled errors will be caught here
      console.error('Unhandled login error:', error);
      if (!serverError) {
        setServerError(error?.message || 'An unexpected error occurred. Please try again.');
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
          title="Sign in to your account"
          description="Enter your credentials to access your account"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {serverError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{serverError}</p>
                </div>
              </div>
            </div>
          )}
          
          <form 
            className="space-y-6" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit((data) => onSubmit(data, e))();
            }}
          >
            <div className="space-y-4">
              <EmailInput
                name="email"
                label="Email address"
                placeholder="john@example.com"
                control={control}
                error={errors.email?.message as string | undefined}
                disabled={isSubmitting}
                isRequired
              />

              <PasswordInput
                name="password"
                label="Password"
                placeholder="••••••••"
                control={control}
                error={errors.password?.message as string | undefined}
                disabled={isSubmitting}
                isRequired
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
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
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
