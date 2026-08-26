import apiClient from './apiClient'
import type { Country } from '../types/country'

export const countryApi = {
  getAll: async (): Promise<Country[]> => {
    const response = await apiClient.get<Country[]>('/country')
    return response.data
  },
}
