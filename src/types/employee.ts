export interface Employee {
  id: string
  name: string
  email: string
  mobile: string
  country: string
  state: string
  district: string
  createdAt?: string
  updatedAt?: string
}

export type CreateEmployeePayload = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateEmployeePayload = Partial<CreateEmployeePayload>
