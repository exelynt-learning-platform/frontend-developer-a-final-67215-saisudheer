import apiClient from './apiClient'
import type { Employee, CreateEmployeePayload, UpdateEmployeePayload } from '../types/employee'

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/employee')
    return response.data
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`/employee/${id}`)
    return response.data
  },

  create: async (payload: CreateEmployeePayload): Promise<Employee> => {
    const response = await apiClient.post<Employee>('/employee', payload)
    return response.data
  },

  update: async (id: string, payload: UpdateEmployeePayload): Promise<Employee> => {
    const response = await apiClient.put<Employee>(`/employee/${id}`, payload)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/employee/${id}`)
  },
}
