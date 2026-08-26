import { useEffect } from 'react'
import { Container, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearMutationError,
  fetchEmployeeById,
  updateEmployee,
} from '../features/employees/employeeSlice'
import {
  selectMutationError,
  selectMutationLoading,
  selectSearchError,
  selectSearchLoading,
  selectSearchResult,
} from '../features/employees/employeeSelectors'
import { fetchCountries } from '../features/countries/countrySlice'
import { EmployeeForm } from '../components/employee/EmployeeForm'
import { PageHeader } from '../components/common/PageHeader'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { Notification } from '../components/common/Notification'
import type { EmployeeFormData } from '../schemas/employeeSchema'

export const EmployeeEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const employee = useAppSelector(selectSearchResult)
  const searchLoading = useAppSelector(selectSearchLoading)
  const searchError = useAppSelector(selectSearchError)
  const mutationLoading = useAppSelector(selectMutationLoading)
  const mutationError = useAppSelector(selectMutationError)

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id))
      dispatch(fetchCountries())
    }
  }, [dispatch, id])

  const handleSubmit = async (data: EmployeeFormData) => {
    if (!id) return

    try {
      await dispatch(updateEmployee({ id, payload: data })).unwrap()
      navigate('/employees', {
        state: { notification: 'Employee updated successfully' },
      })
    } catch {
      // The rejected thunk is exposed through the mutation error selector.
    }
  }

  if (!id) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ErrorState
          title="Invalid employee"
          message="The employee ID is missing."
          actionLabel="Back to Employees"
          onRetry={() => navigate('/employees')}
        />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageHeader title="Edit Employee" subtitle="Update employee information" />
      {searchLoading && <LoadingState message="Loading employee..." />}
      {!searchLoading && searchError && (
        <ErrorState
          title="Unable to Load Employee"
          message={searchError}
          actionLabel="Retry"
          onRetry={() => dispatch(fetchEmployeeById(id))}
        />
      )}
      {!searchLoading && !searchError && !employee && (
        <ErrorState
          title="Employee Not Found"
          message="The requested employee could not be found."
          actionLabel="Back to Employees"
          onRetry={() => navigate('/employees')}
        />
      )}
      {!searchLoading && !searchError && employee && (
        <Paper sx={{ p: { xs: 2, sm: 4 } }}>
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            loading={mutationLoading}
            onCancel={() => navigate('/employees')}
          />
        </Paper>
      )}
      {mutationError && (
        <Notification
          open
          message={mutationError}
          severity="error"
          onClose={() => dispatch(clearMutationError())}
        />
      )}
    </Container>
  )
}
