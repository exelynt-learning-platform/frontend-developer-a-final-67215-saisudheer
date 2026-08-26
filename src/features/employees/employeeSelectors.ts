import type { RootState } from '../../app/store'
import { employeeSelectors } from './employeeSlice'

export const selectAllEmployees = (state: RootState) => employeeSelectors.selectAll(state.employees)
export const selectEmployeeById = (id: string) => (state: RootState) =>
  employeeSelectors.selectById(state.employees, id)
export const selectEmployeesLoading = (state: RootState) => state.employees.listLoading
export const selectEmployeesError = (state: RootState) => state.employees.listError
export const selectSearchLoading = (state: RootState) => state.employees.searchLoading
export const selectSearchError = (state: RootState) => state.employees.searchError
export const selectSearchResult = (state: RootState) => state.employees.searchResult
export const selectMutationLoading = (state: RootState) => state.employees.mutationLoading
export const selectMutationError = (state: RootState) => state.employees.mutationError
