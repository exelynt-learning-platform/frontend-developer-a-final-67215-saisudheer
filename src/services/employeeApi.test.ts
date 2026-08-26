import { describe, it, expect } from 'vitest'
import { employeeApi } from '../services/employeeApi'
import type { CreateEmployeePayload } from '../types/employee'

describe('employeeApi', () => {
  describe('getAll', () => {
    it('should fetch all employees successfully', async () => {
      const employees = await employeeApi.getAll()
      expect(Array.isArray(employees)).toBe(true)
      expect(employees.length).toBeGreaterThan(0)
      expect(employees[0]).toHaveProperty('id')
      expect(employees[0]).toHaveProperty('name')
      expect(employees[0]).toHaveProperty('email')
    })
  })

  describe('getById', () => {
    it('should fetch a single employee by ID', async () => {
      const employee = await employeeApi.getById('1')
      expect(employee).toBeDefined()
      expect(employee.id).toBe('1')
      expect(employee).toHaveProperty('name')
      expect(employee).toHaveProperty('email')
      expect(employee).toHaveProperty('mobile')
      expect(employee).toHaveProperty('country')
      expect(employee).toHaveProperty('state')
      expect(employee).toHaveProperty('district')
    })

    it('should throw error for non-existent employee', async () => {
      await expect(employeeApi.getById('999')).rejects.toThrow()
    })
  })

  describe('create', () => {
    it('should create a new employee successfully', async () => {
      const newEmployee: CreateEmployeePayload = {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        mobile: '5555555555',
        country: 'Canada',
        state: 'Ontario',
        district: 'Toronto',
      }

      const created = await employeeApi.create(newEmployee)
      expect(created).toBeDefined()
      expect(created.id).toBeDefined()
      expect(created.name).toBe(newEmployee.name)
      expect(created.email).toBe(newEmployee.email)
      expect(created.mobile).toBe(newEmployee.mobile)
      expect(created.country).toBe(newEmployee.country)
      expect(created.state).toBe(newEmployee.state)
      expect(created.district).toBe(newEmployee.district)
    })

    it('should create employee with all required fields', async () => {
      const newEmployee: CreateEmployeePayload = {
        name: 'Bob Smith',
        email: 'bob@example.com',
        mobile: '6666666666',
        country: 'USA',
        state: 'Florida',
        district: 'Miami',
      }

      const created = await employeeApi.create(newEmployee)
      expect(Object.keys(created)).toContain('id')
      expect(Object.keys(created)).toContain('name')
      expect(Object.keys(created)).toContain('email')
      expect(Object.keys(created)).toContain('mobile')
      expect(Object.keys(created)).toContain('country')
      expect(Object.keys(created)).toContain('state')
      expect(Object.keys(created)).toContain('district')
    })
  })

  describe('update', () => {
    it('should update an existing employee', async () => {
      const updatePayload = {
        name: 'John Doe Updated',
      }

      const updated = await employeeApi.update('1', updatePayload)
      expect(updated.id).toBe('1')
      expect(updated.name).toBe('John Doe Updated')
    })

    it('should partially update employee fields', async () => {
      const updatePayload = {
        email: 'newemail@example.com',
        mobile: '9999999999',
      }

      const updated = await employeeApi.update('2', updatePayload)
      expect(updated.email).toBe('newemail@example.com')
      expect(updated.mobile).toBe('9999999999')
    })

    it('should throw error when updating non-existent employee', async () => {
      const updatePayload = { name: 'Test' }
      await expect(employeeApi.update('999', updatePayload)).rejects.toThrow()
    })
  })

  describe('delete', () => {
    it('should delete an employee successfully', async () => {
      await expect(employeeApi.delete('1')).resolves.toBeUndefined()
    })

    it('should throw error when deleting non-existent employee', async () => {
      await expect(employeeApi.delete('999')).rejects.toThrow()
    })
  })
})
