interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

export interface ApiErrorResponse {
  message: string
  errors?: Array<{
    field: string
    message: string[]
  }>
}

export interface ApiResponse {
  token?: string
  success: boolean
  data: any
  message?: string[]
  errors?: Array<{
    field: string
    message: string[]
  }>
}

export class ApiService {
  // Ensure the base URL points to the backend server on port 3001
  private static baseUrl = 'http://localhost:3001'

  static handleError(error: any): ApiErrorResponse {
    // If the error already has the correct format with field-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      return {
        message: error.message || 'Validation failed',
        errors: error.errors,
      }
    }

    // If it's an API response with errors
    if (error?.data?.errors && Array.isArray(error.data.errors)) {
      return {
        message: error.data.message || 'Validation failed',
        errors: error.data.errors,
      }
    }

    // Check for field-specific error messages in the error message
    const message =
      error?.data?.message || error?.message || 'An unexpected error occurred'
    const fieldMatches = {
      email: /email|user/i,
      password: /password/i,
      firstName: /first\s*name/i,
      lastName: /last\s*name/i,
    }

    for (const [field, pattern] of Object.entries(fieldMatches)) {
      if (pattern.test(message.toLowerCase())) {
        return {
          message,
          errors: [
            {
              field,
              message: [message],
            },
          ],
        }
      }
    }

    // For unexpected errors
    return {
      message,
      errors: [
        {
          field: 'general',
          message: [message],
        },
      ],
    }
  }

  private static async request(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse> {
    try {
      const { params, ...requestOptions } = options
      const queryString = params ? `?${new URLSearchParams(params)}` : ''
      const url = `${this.baseUrl}${endpoint}${queryString}`

      console.log(`Making request to: ${url}`) // Log the URL being called
      
      console.log('Making API request:', {
        url,
        method: options.method || 'GET',
        headers: options.headers,
        body: options.body ? JSON.parse(options.body as string) : undefined,
      })

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...requestOptions,
      })

      // Read the response body only once
      const responseText = await response.text()
      let result: any = {}
      
      try {
        result = responseText ? JSON.parse(responseText) : {}
      } catch (e) {
        console.error('Failed to parse JSON response:', e, 'Response text:', responseText)
        // If we can't parse as JSON, use the raw text as the message
        result = { message: responseText }
      }

      if (!response.ok) {
        // Log the complete error response
        console.group('API Error Details');
        console.log('Status:', response.status, response.statusText);
        console.log('URL:', url);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
        console.log('Response Body:', result);
        
        // Create a more detailed error object
        let errorMessage = 'API request failed';
        
        // Handle different error response formats
        if (result?.message) {
          errorMessage = Array.isArray(result.message) 
            ? result.message.join(' ') 
            : result.message;
        } else if (result?.errors) {
          // Handle array of error objects
          if (Array.isArray(result.errors)) {
            errorMessage = result.errors
              .map((e: any) => e.msg || e.message || JSON.stringify(e))
              .join('; ');
          } 
          // Handle object with field errors
          else if (typeof result.errors === 'object') {
            errorMessage = Object.entries(result.errors)
              .map(([field, messages]) => {
                const msg = Array.isArray(messages) ? messages.join(', ') : String(messages);
                return `${field}: ${msg}`;
              })
              .join('; ');
          }
        } else if (response.statusText) {
          errorMessage = response.statusText;
        }
        
        const error = new Error(errorMessage) as any;
        error.status = response.status;
        error.statusText = response.statusText;
        error.response = result || responseText;
        error.url = url;
        
        // Include validation errors if present
        if (result?.errors) {
          error.errors = result.errors;
          error.validationErrors = [];
          
          // Handle array of error objects
          if (Array.isArray(result.errors)) {
            error.validationErrors = result.errors.map((err: any) => ({
              field: err.field || 'general',
              message: err.msg || err.message || JSON.stringify(err)
            }));
          } 
          // Handle object with field errors
          else if (typeof result.errors === 'object') {
            error.validationErrors = Object.entries(result.errors).map(([field, messages]) => ({
              field,
              message: Array.isArray(messages) ? messages.join(', ') : String(messages)
            }));
          }
        }
        
        console.groupEnd();
        throw error;
      }

      return {
        data: result.data || result, // Handle both { data: ... } and direct response formats
        success: true,
        message: result.message,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  static async get(
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse> {
    return this.request(endpoint, {
      ...options,
      method: 'GET',
    })
  }

  static async post(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse> {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  static async put(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse> {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  static async delete(
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse> {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    })
  }
}
