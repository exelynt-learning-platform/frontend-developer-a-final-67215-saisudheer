export interface ApiErrorResponse {
  message?: string
  status?: number
  code?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
}
