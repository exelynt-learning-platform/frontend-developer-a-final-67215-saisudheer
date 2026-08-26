import { useEffect, useState } from 'react'
import { Container, Box, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearMutationError,
  fetchEmployees,
  fetchEmployeeById,
  clearSearchResult,
  deleteEmployee,
} from '../features/employees/employeeSlice'
import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
  selectSearchLoading,
  selectSearchError,
  selectSearchResult,
  selectMutationError,
  selectMutationLoading,
} from '../features/employees/employeeSelectors'
import { fetchCountries } from '../features/countries/countrySlice'
import { PageHeader } from '../components/common/PageHeader'
import { LoadingState } from '../components/common/LoadingState'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorState } from '../components/common/ErrorState'
import { EmployeeTable } from '../components/employee/EmployeeTable'
import { EmployeeSearch } from '../components/employee/EmployeeSearch'
import { Notification } from '../components/common/Notification'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import type { Employee } from '../types/employee'

export const EmployeeListPage = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [notification, setNotification] = useState<string | null>(
    (location.state as { notification?: string } | null)?.notification ?? null,
  )
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchId, setSearchId] = useState<string | null>(null)

  const employees = useAppSelector(selectAllEmployees)
  const employeesLoading = useAppSelector(selectEmployeesLoading)
  const employeesError = useAppSelector(selectEmployeesError)
  const searchLoading = useAppSelector(selectSearchLoading)
  const searchError = useAppSelector(selectSearchError)
  const searchResult = useAppSelector(selectSearchResult)
  const mutationLoading = useAppSelector(selectMutationLoading)
  const mutationError = useAppSelector(selectMutationError)

  // Fetch employees and countries on mount
  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchCountries())
  }, [dispatch])

  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

  const handleSearch = (id: string) => {
    setSearchId(id)
    dispatch(fetchEmployeeById(id))
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchId(null)
    dispatch(clearSearchResult())
  }

  const handleEdit = (employee: Employee) => {
    navigate(`/employees/${employee.id}/edit`)
  }

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee)
  }

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return

    try {
      await dispatch(deleteEmployee(selectedEmployee.id)).unwrap()
      dispatch(clearSearchResult())
      setSelectedEmployee(null)
      setNotification('Employee deleted successfully')
    } catch {
      // The rejected thunk is exposed through the mutation error selector.
    }
  }

  const handleAddEmployee = () => {
    navigate('/employees/new')
  }

  // Determine which list to display
  const displayEmployees = searchId !== null && searchResult ? [searchResult] : employees
  const isSearching = searchId !== null
  const displayLoading = isSearching ? searchLoading : employeesLoading
  const displayError = isSearching ? searchError : employeesError

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Employee Management"
        subtitle="Manage employee information"
        action={
          <Button variant="contained" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        }
      />

      <EmployeeSearch
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        loading={searchLoading}
      />

      {displayLoading && <LoadingState message={isSearching ? 'Searching employee...' : 'Loading employees...'} />}

      {displayError && (
        <ErrorState
          title={isSearching ? 'Search Failed' : 'Failed to Load Employees'}
          message={displayError}
          actionLabel={isSearching ? 'Clear' : 'Retry'}
          onRetry={() => (isSearching ? handleClearSearch() : dispatch(fetchEmployees()))}
        />
      )}

      {!displayLoading && !displayError && displayEmployees.length === 0 && (
        <EmptyState
          title={isSearching ? 'No employee found' : 'No employees yet'}
          message={
            isSearching
              ? 'The employee with the provided ID could not be found.'
              : 'Add your first employee to get started.'
          }
          actionLabel={isSearching ? 'Clear Search' : 'Add Employee'}
          onAction={() => (isSearching ? handleClearSearch() : handleAddEmployee())}
        />
      )}

      {!displayLoading && !displayError && displayEmployees.length > 0 && (
        <Box>
          {isSearching && (
            <Box mb={2}>
              <Button
                variant="text"
                onClick={handleClearSearch}
                sx={{ mb: 2 }}
              >
                ← Back to All Employees
              </Button>
            </Box>
          )}
          <EmployeeTable employees={displayEmployees} onEdit={handleEdit} onDelete={handleDelete} />
        </Box>
      )}
      <Notification
        open={notification !== null}
        message={notification ?? ''}
        severity="success"
        onClose={() => setNotification(null)}
      />
      {mutationError && (
        <Notification
          open
          message={mutationError}
          severity="error"
          onClose={() => dispatch(clearMutationError())}
        />
      )}
      <ConfirmDialog
        open={selectedEmployee !== null}
        title="Delete Employee"
        message={
          selectedEmployee
            ? `Are you sure you want to delete ${selectedEmployee.name}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedEmployee(null)}
        loading={mutationLoading}
      />
    </Container>
  )
}
