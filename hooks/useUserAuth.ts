import { setUserStore, clearCredentials } from '@/store/slices/auth.slice'
import { ApiService } from '@/utils/services/api.service'
import { useSelector, useDispatch } from 'react-redux'
import { LoginCredentials } from '@/types/auth'
import { useRouter } from 'next/router'
import { RootState } from '@/store'
import { UseAuthOptions } from '@/types/auth'
import { AuthState } from '@/store/slices/auth.slice'
import { useState } from 'react'

export function useUserAuth(options: UseAuthOptions = {}) {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth) as AuthState
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      console.group('Login Request');
      console.log('Login credentials received:', { 
        email: credentials.email,
        hasPassword: !!credentials.password
      })
      
      // Validate credentials before sending
      if (!credentials.email || !credentials.password) {
        const error = new Error('Email and password are required') as any;
        error.isValidationError = true;
        error.validationErrors = [
          { field: !credentials.email ? 'email' : 'password', message: 'This field is required' }
        ];
        throw error;
      }
      
      // Create the request payload with only email and password
      const requestPayload = {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password
      };
      
      console.log('Sending login request with payload:', {
        ...requestPayload,
        password: '[REDACTED]' // Don't log actual password
      });
      
      // Log the full request details
      console.group('Login Request');
      console.log('Endpoint:', '/api/auth/login');
      console.log('Request Payload (sensitive data redacted):', {
        email: requestPayload.email,
        hasPassword: !!requestPayload.password
      });
      
      try {
        // Make the API request
        console.log('Sending login request to: /api/auth/login');
        const response = await ApiService.post('/api/auth/login', requestPayload);
        
        console.log('Login response:', {
          status: 'Success',
          hasToken: !!response.data?.token,
          user: response.data?.user ? 'User data received' : 'No user data',
          responseData: response.data
        });
        
        if (response.data?.token) {
          console.log('Login successful, received access token');
          const { token, user } = response.data;
          console.log('Dispatching login success with token and user:', { 
            hasToken: !!token,
            userId: user?.id 
          });
          
          dispatch(
            setUserStore({
              token: token,
              user: user,
            })
          );
          
          // Store the token in localStorage for persistence
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          
          if (options.redirectTo) {
            console.log('Redirecting to:', options.redirectTo);
            router.push(options.redirectTo);
          }
          
          return response.data;
        } else {
          const error = new Error('Invalid response from server: Missing access token');
          console.error('Login failed - invalid response format:', response);
          throw error;
        }
      } catch (error: any) {
        console.group('Login Error');
        
        // Log all available error information
        const errorDetails = {
          name: error.name,
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          isValidationError: error.status === 400,
          response: error.response,
          validationErrors: error.validationErrors,
          stack: error.stack
        };
        
        console.error('Error details:', errorDetails);
        
        // Log validation errors if they exist
        if (error.validationErrors?.length > 0) {
          console.group('Validation Errors');
          error.validationErrors.forEach((err: any, index: number) => {
            console.log(`Error ${index + 1}:`, err);
          });
          console.groupEnd();
        }
        
        console.groupEnd();
        
        // Create a more detailed error message
        let errorMessage = 'Login failed';
        
        // Use validation errors if available
        if (error.validationErrors?.length > 0) {
          errorMessage = error.validationErrors
            .map((err: any) => {
              // Format field name for display
              const fieldName = err.field === 'general' ? '' : `${err.field}: `;
              return `${fieldName}${err.message}`;
            })
            .join('\n');
        } 
        // Fall back to error message or status text
        else if (error.message) {
          errorMessage = error.message;
        } else if (error.statusText) {
          errorMessage = error.statusText;
        }
        
        // Create enhanced error with all the details
        const enhancedError = new Error(errorMessage) as any;
        enhancedError.status = error.status;
        enhancedError.statusText = error.statusText;
        enhancedError.response = error.response;
        enhancedError.isValidationError = error.status === 400;
        enhancedError.validationErrors = error.validationErrors || [];
        
        throw enhancedError;
      }
    } catch (error: any) {
      console.error('Login error details:', {
        name: error.name,
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        responseText: error.responseText,
        stack: error.stack
      })
      
      // Enhance the error message with more details
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.'
      } else if (error.status === 404) {
        errorMessage = 'The login endpoint was not found. Please check the API URL.'
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      const enhancedError = new Error(errorMessage)
      enhancedError.name = error.name || 'LoginError'
      ;(enhancedError as any).status = error.status
      ;(enhancedError as any).originalError = error
      
      return Promise.reject(enhancedError)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true);
      // Clear the token from local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      
      // Clear the auth state
      dispatch(clearCredentials());
      
      // Redirect if needed
      if (options.redirectTo) {
        await router.push(options.redirectTo);
      }
      
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    auth,
    isLoading,
    login,
    logout,
  };
}

export default useUserAuth;
