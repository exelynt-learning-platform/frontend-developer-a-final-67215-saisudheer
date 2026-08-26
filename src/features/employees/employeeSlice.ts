import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import type { EntityState } from '@reduxjs/toolkit'
import type { Employee } from '../../types/employee'
import { employeeApi } from '../../services/employeeApi'

export interface EmployeeState extends EntityState<Employee, string> {
  listLoading: boolean
  listError: string | null
  searchLoading: boolean
  searchError: string | null
  searchResult: Employee | null
  mutationLoading: boolean
  mutationError: string | null
}

const employeeAdapter = createEntityAdapter<Employee, string>({
  selectId: (employee) => employee.id,
})

// Async thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await employeeApi.getAll()
    } catch {
      return rejectWithValue('Failed to fetch employees')
    }
  },
)

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await employeeApi.getById(id)
    } catch {
      return rejectWithValue('Employee not found')
    }
  },
)

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (payload: Parameters<typeof employeeApi.create>[0], { rejectWithValue }) => {
    try {
      return await employeeApi.create(payload)
    } catch {
      return rejectWithValue('Failed to create employee')
    }
  },
)

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, payload }: { id: string; payload: Parameters<typeof employeeApi.update>[1] }, { rejectWithValue }) => {
    try {
      return await employeeApi.update(id, payload)
    } catch {
      return rejectWithValue('Failed to update employee')
    }
  },
)

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await employeeApi.delete(id)
      return id
    } catch {
      return rejectWithValue('Failed to delete employee')
    }
  },
)

const initialState: EmployeeState = employeeAdapter.getInitialState({
  listLoading: false,
  listError: null,
  searchLoading: false,
  searchError: null,
  searchResult: null,
  mutationLoading: false,
  mutationError: null,
})

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = null
      state.searchError = null
    },
    clearMutationError: (state) => {
      state.mutationError = null
    },
  },
  extraReducers: (builder) => {
    // Fetch all employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.listLoading = true
        state.listError = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.listLoading = false
        employeeAdapter.setAll(state, action.payload)
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.listLoading = false
        state.listError = action.payload as string
      })

    // Fetch by ID (search)
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true
        state.searchError = null
        state.searchResult = null
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResult = action.payload
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false
        state.searchError = action.payload as string
        state.searchResult = null
      })

    // Create employee
    builder
      .addCase(createEmployee.pending, (state) => {
        state.mutationLoading = true
        state.mutationError = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false
        employeeAdapter.addOne(state, action.payload)
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.mutationLoading = false
        state.mutationError = action.payload as string
      })

    // Update employee
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.mutationLoading = true
        state.mutationError = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false
        employeeAdapter.setOne(state, action.payload)
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.mutationLoading = false
        state.mutationError = action.payload as string
      })

    // Delete employee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.mutationLoading = true
        state.mutationError = null
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false
        employeeAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.mutationLoading = false
        state.mutationError = action.payload as string
      })
  },
})

export const { clearSearchResult, clearMutationError } = employeeSlice.actions
export default employeeSlice.reducer

// Export entity selectors
export const employeeSelectors = employeeAdapter.getSelectors((state: EmployeeState) => state)
