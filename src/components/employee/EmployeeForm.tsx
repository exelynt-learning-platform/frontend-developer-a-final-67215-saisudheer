import { useEffect } from 'react'
import { employeeSchema } from '../../schemas/employeeSchema'
import type { EmployeeFormData } from '../../schemas/employeeSchema'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  TextField,
  Button,
  Stack,
  FormHelperText,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import type { Employee } from '../../types/employee'
import { useAppSelector } from '../../app/hooks'
import { selectCountries, selectCountriesLoading } from '../../features/countries/countrySelectors'

interface EmployeeFormProps {
  initialData?: Employee
  onSubmit: (data: EmployeeFormData) => void | Promise<void>
  loading?: boolean
  onCancel?: () => void
}

export const EmployeeForm = ({ initialData, onSubmit, loading = false, onCancel }: EmployeeFormProps) => {
  const countries = useAppSelector(selectCountries)
  const countriesLoading = useAppSelector(selectCountriesLoading)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: 'onBlur',
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          mobile: initialData.mobile,
          country: initialData.country,
          state: initialData.state,
          district: initialData.district,
        }
      : {
          name: '',
          email: '',
          mobile: '',
          country: '',
          state: '',
          district: '',
        },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        mobile: initialData.mobile,
        country: initialData.country,
        state: initialData.state,
        district: initialData.district,
      })
    }
  }, [initialData, reset])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              required
              disabled={loading}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              required
              disabled={loading}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Mobile Field */}
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile"
              fullWidth
              required
              disabled={loading}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          )}
        />

        {/* Country Field */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required error={!!errors.country} disabled={loading}>
              <InputLabel>Country</InputLabel>
              <Select {...field} label="Country">
                {initialData && !countries.some((country) => country.name === initialData.country) && (
                  <MenuItem value={initialData.country}>{initialData.country}</MenuItem>
                )}
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
            </FormControl>
          )}
        />

        {/* State Field */}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              fullWidth
              required
              disabled={loading}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          )}
        />

        {/* District Field */}
        <Controller
          name="district"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="District"
              fullWidth
              required
              disabled={loading}
              error={!!errors.district}
              helperText={errors.district?.message}
            />
          )}
        />

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading || countriesLoading}
            startIcon={loading ? <CircularProgress size={20} /> : undefined}
          >
            {loading ? 'Saving...' : initialData ? 'Update Employee' : 'Create Employee'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
