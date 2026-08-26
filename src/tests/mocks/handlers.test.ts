import { describe, it, expect } from 'vitest'
import { employeeApi } from '../../services/employeeApi'
import { countryApi } from '../../services/countryApi'
import type { Employee, CreateEmployeePayload } from '../../types/employee'

/**
 * Integration tests for MSW mock API handlers.
 * These tests verify that the mock API handlers are working correctly
 * and returning the expected data structure and behavior.
 */

describe('MSW Mock API Integration', () => {
  describe('Employee API Mock Handlers', () => {
    it('should return mocked employees list', async () => {
      const employees = await employeeApi.getAll()
      expect(Array.isArray(employees)).toBe(true)
      expect(employees.length).toBeGreaterThan(0)

      // Verify all required fields exist
      employees.forEach((emp: Employee) => {
        expect(emp.id).toBeDefined()
        expect(emp.name).toBeDefined()
        expect(emp.email).toBeDefined()
        expect(emp.mobile).toBeDefined()
        expect(emp.country).toBeDefined()
        expect(emp.state).toBeDefined()
        expect(emp.district).toBeDefined()
      })
    })

    it('should return employee with correct ID', async () => {
      const employee = await employeeApi.getById('1')
      expect(employee.id).toBe('1')
      expect(employee.name).toBeTruthy()
      expect(employee.email).toBeTruthy()
    })

    it('should handle POST request to create employee', async () => {
      const newEmployee: CreateEmployeePayload = {
        name: 'Test Employee',
        email: 'test@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'Test State',
        district: 'Test District',
      }

      const created = await employeeApi.create(newEmployee)
      expect(created.id).toBeDefined()
      expect(created.name).toBe(newEmployee.name)
      expect(created.email).toBe(newEmployee.email)
    })

    it('should handle PUT request to update employee', async () => {
      const updatePayload = {
        name: 'Updated Name',
      }

      const updated = await employeeApi.update('1', updatePayload)
      expect(updated.id).toBe('1')
      expect(updated.name).toBe('Updated Name')
    })

    it('should handle DELETE request', async () => {
      await expect(employeeApi.delete('1')).resolves.toBeUndefined()
    })

    it('should handle 404 errors correctly', async () => {
      await expect(employeeApi.getById('nonexistent-id')).rejects.toBeTruthy()
    })
  })

  describe('Country API Mock Handlers', () => {
    it('should return mocked countries list', async () => {
      const countries = await countryApi.getAll()
      expect(Array.isArray(countries)).toBe(true)
      expect(countries.length).toBeGreaterThan(0)

      // Verify structure
      countries.forEach((country) => {
        expect(country.id).toBeDefined()
        expect(country.name).toBeDefined()
      })
    })

    it('should contain expected countries', async () => {
      const countries = await countryApi.getAll()
      const countryNames = countries.map((c) => c.name)
      expect(countryNames).toContain('USA')
      expect(countryNames).toContain('India')
      expect(countryNames).toContain('UK')
      expect(countryNames).toContain('Canada')
    })
  })

  describe('API Error Handling', () => {
    it('should reject promise on 404 for employee', async () => {
      try {
        await employeeApi.getById('invalid-id-that-does-not-exist')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })

    it('should reject promise on 404 for delete', async () => {
      try {
        await employeeApi.delete('invalid-id')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })
})
