import { describe, it, expect, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import employeeReducer, {
  fetchEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  clearSearchResult,
  clearMutationError,
} from './employeeSlice'
import type { EmployeeState } from './employeeSlice'
import type { Employee } from '../../types/employee'

describe('employeeSlice', () => {
  interface TestStore {
    employees: EmployeeState
  }

  let store: ReturnType<typeof configureStore<TestStore>>

  beforeEach(() => {
    store = configureStore<TestStore>({
      reducer: {
        employees: employeeReducer,
      },
    })
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().employees as EmployeeState
      expect(state.ids).toEqual([])
      expect(state.entities).toEqual({})
      expect(state.listLoading).toBe(false)
      expect(state.listError).toBeNull()
      expect(state.searchLoading).toBe(false)
      expect(state.searchError).toBeNull()
      expect(state.searchResult).toBeNull()
      expect(state.mutationLoading).toBe(false)
      expect(state.mutationError).toBeNull()
    })
  })

  describe('fetchEmployees thunk', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchEmployees.pending('', undefined))
      const state = store.getState().employees as EmployeeState
      expect(state.listLoading).toBe(true)
      expect(state.listError).toBeNull()
    })

    it('should handle fulfilled state', () => {
      const mockEmployees: Employee[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          mobile: '1234567890',
          country: 'USA',
          state: 'California',
          district: 'Los Angeles',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          mobile: '9876543210',
          country: 'USA',
          state: 'Texas',
          district: 'Houston',
        },
      ]

      store.dispatch(fetchEmployees.fulfilled(mockEmployees, '', undefined))
      const state = store.getState().employees as EmployeeState

      expect(state.listLoading).toBe(false)
      expect(state.ids).toHaveLength(2)
      expect(state.entities['1']).toEqual(mockEmployees[0])
      expect(state.entities['2']).toEqual(mockEmployees[1])
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch employees'
      store.dispatch(fetchEmployees.rejected(new Error(), '', undefined, errorMessage))
      const state = store.getState().employees as EmployeeState

      expect(state.listLoading).toBe(false)
      expect(state.listError).toBe(errorMessage)
    })
  })

  describe('fetchEmployeeById thunk', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchEmployeeById.pending('', '1'))
      const state = store.getState().employees as EmployeeState
      expect(state.searchLoading).toBe(true)
      expect(state.searchError).toBeNull()
      expect(state.searchResult).toBeNull()
    })

    it('should handle fulfilled state', () => {
      const mockEmployee: Employee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'California',
        district: 'Los Angeles',
      }

      store.dispatch(fetchEmployeeById.fulfilled(mockEmployee, '', '1'))
      const state = store.getState().employees as EmployeeState

      expect(state.searchLoading).toBe(false)
      expect(state.searchResult).toEqual(mockEmployee)
      expect(state.searchError).toBeNull()
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Employee not found'
      store.dispatch(fetchEmployeeById.rejected(new Error(), '', '999', errorMessage))
      const state = store.getState().employees as EmployeeState

      expect(state.searchLoading).toBe(false)
      expect(state.searchError).toBe(errorMessage)
      expect(state.searchResult).toBeNull()
    })
  })

  describe('createEmployee thunk', () => {
    it('should handle pending state', () => {
      const payload = {
        name: 'New Employee',
        email: 'new@example.com',
        mobile: '1111111111',
        country: 'USA',
        state: 'NY',
        district: 'NYC',
      }
      store.dispatch(createEmployee.pending('', payload))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(true)
      expect(state.mutationError).toBeNull()
    })

    it('should handle fulfilled state', () => {
      const newEmployee: Employee = {
        id: '3',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        mobile: '5555555555',
        country: 'Canada',
        state: 'Ontario',
        district: 'Toronto',
      }

      store.dispatch(createEmployee.fulfilled(newEmployee, '', {} as Parameters<typeof createEmployee>[0]))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.entities['3']).toEqual(newEmployee)
      expect(state.ids).toContain('3')
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to create employee'
      store.dispatch(createEmployee.rejected(new Error(), '', {} as Parameters<typeof createEmployee>[0], errorMessage))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.mutationError).toBe(errorMessage)
    })
  })

  describe('updateEmployee thunk', () => {
    beforeEach(() => {
      const existingEmployee: Employee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'California',
        district: 'Los Angeles',
      }
      store.dispatch(fetchEmployees.fulfilled([existingEmployee], '', undefined))
    })

    it('should handle fulfilled state and update entity', () => {
      const updatedEmployee: Employee = {
        id: '1',
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'California',
        district: 'Los Angeles',
      }

      store.dispatch(updateEmployee.fulfilled(updatedEmployee, '', { id: '1', payload: {} }))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.entities['1']?.name).toBe('John Doe Updated')
      expect(state.entities['1']?.email).toBe('john.updated@example.com')
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to update employee'
      store.dispatch(
        updateEmployee.rejected(new Error(), '', { id: '1', payload: {} }, errorMessage),
      )
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.mutationError).toBe(errorMessage)
    })
  })

  describe('deleteEmployee thunk', () => {
    beforeEach(() => {
      const existingEmployee: Employee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'California',
        district: 'Los Angeles',
      }
      store.dispatch(fetchEmployees.fulfilled([existingEmployee], '', undefined))
    })

    it('should handle fulfilled state and remove entity', () => {
      store.dispatch(deleteEmployee.fulfilled('1', '', '1'))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.entities['1']).toBeUndefined()
      expect(state.ids).not.toContain('1')
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to delete employee'
      store.dispatch(deleteEmployee.rejected(new Error(), '', '1', errorMessage))
      const state = store.getState().employees as EmployeeState

      expect(state.mutationLoading).toBe(false)
      expect(state.mutationError).toBe(errorMessage)
      expect(state.entities['1']).toBeDefined() // Should still exist
    })
  })

  describe('reducers', () => {
    it('clearSearchResult should reset search state', () => {
      const mockEmployee: Employee = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        country: 'USA',
        state: 'California',
        district: 'Los Angeles',
      }

      store.dispatch(fetchEmployeeById.fulfilled(mockEmployee, '', '1'))
      let state = store.getState().employees as EmployeeState
      expect(state.searchResult).toBeDefined()

      store.dispatch(clearSearchResult())
      state = store.getState().employees as EmployeeState
      expect(state.searchResult).toBeNull()
      expect(state.searchError).toBeNull()
    })

    it('clearMutationError should reset mutation error', () => {
      store.dispatch(createEmployee.rejected(new Error(), '', {} as Parameters<typeof createEmployee>[0], 'Creation failed'))
      let state = store.getState().employees as EmployeeState
      expect(state.mutationError).toBe('Creation failed')

      store.dispatch(clearMutationError())
      state = store.getState().employees as EmployeeState
      expect(state.mutationError).toBeNull()
    })
  })
})
