import { useEffect } from 'react'
import { Container, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createEmployee, clearMutationError } from '../features/employees/employeeSlice'
import { fetchCountries } from '../features/countries/countrySlice'
import {
  selectMutationError,
  selectMutationLoading,
} from '../features/employees/employeeSelectors'
import { EmployeeForm } from '../components/employee/EmployeeForm'
import { PageHeader } from '../components/common/PageHeader'
import { Notification } from '../components/common/Notification'
import type { EmployeeFormData } from '../schemas/employeeSchema'

export const EmployeeCreatePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const mutationLoading = useAppSelector(selectMutationLoading)
  const mutationError = useAppSelector(selectMutationError)
  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      await dispatch(createEmployee(data)).unwrap()
      navigate('/employees', {
        state: { notification: 'Employee created successfully' },
      })
    } catch {
      // The rejected thunk is exposed through the mutation error selector.
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageHeader title="Add Employee" subtitle="Create a new employee record" />
      <Paper sx={{ p: { xs: 2, sm: 4 } }}>
        <EmployeeForm
          onSubmit={handleSubmit}
          loading={mutationLoading}
          onCancel={() => navigate('/employees')}
        />
      </Paper>
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
