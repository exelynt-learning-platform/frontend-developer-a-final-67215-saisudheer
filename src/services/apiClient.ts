import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'

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
  (error: AxiosError) => {
    // Normalize error for consumption in thunks
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    })
  },
)

export default apiClient
