import axios from 'axios'
import type { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'

export class ApiError extends Error {
  readonly status?: number
  readonly data?: unknown
  readonly originalError: AxiosError

  constructor(error: AxiosError) {
    super(error.message)
    this.name = 'ApiError'
    this.status = error.response?.status
    this.data = error.response?.data
    this.originalError = error
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(new ApiError(error)),
)

export default apiClient
