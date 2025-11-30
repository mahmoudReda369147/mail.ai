interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  credentials?: RequestCredentials
}

interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  meta?: {
    count?: number
    pageSize?: number
    nextPageToken?: string | null
    hasMore?: boolean
    resultSizeEstimate?: number
    q?: string | null
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function callApi<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    credentials = 'include'
  } = options

  // Get the base URL from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_BUBLIC_SERVER_URL || ''
  
  if (!baseUrl) {
    throw new Error('Server URL not configured. Please set NEXT_PUBLIC_SERVER_URL in your environment.')
  }

  // Build the full URL
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  // Get auth token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials,
  }

  // Add body for non-GET requests
  if (method !== 'GET' && body !== undefined) {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestOptions)

    // Handle HTTP errors
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = null
      }
      
      throw new ApiError(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    // Parse response
    const data = await response.json()
    
    // Handle API-level errors
    if (!data.success) {
      throw new ApiError(data.message || 'API request failed', undefined, data)
    }

    return data
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error
    }
    
    // Handle network errors or other issues
    if (error instanceof Error) {
      throw new ApiError(`Network error: ${error.message}`)
    }
    
    throw new ApiError('Unknown error occurred during API request')
  }
}

// Convenience methods for common HTTP operations
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    callApi<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    callApi<T>(endpoint, { ...options, method: 'POST', body }),
    
  put: <T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    callApi<T>(endpoint, { ...options, method: 'PUT', body }),
    
  patch: <T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    callApi<T>(endpoint, { ...options, method: 'PATCH', body }),
    
  delete: <T = any>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) =>
    callApi<T>(endpoint, { ...options, method: 'DELETE' }),
}

export { ApiError }
