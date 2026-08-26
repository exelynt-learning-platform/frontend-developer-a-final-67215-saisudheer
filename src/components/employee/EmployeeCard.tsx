import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Employee } from '../../types/employee'

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box mb={1}>
        <strong>{employee.name}</strong>
      </Box>
      <Box fontSize="0.875rem" color="text.secondary" mb={1}>
        Employee ID: {employee.id}
      </Box>
      <Box fontSize="0.875rem" color="textSecondary" mb={1}>
        <div>Email: {employee.email}</div>
        <div>Mobile: {employee.mobile}</div>
        <div>Country: {employee.country}</div>
        <div>Location: {employee.state}, {employee.district}</div>
      </Box>
      <Box display="flex" gap={1} justifyContent="flex-end">
        <Tooltip title="Edit">
          <IconButton aria-label={`Edit ${employee.name}`} size="small" onClick={() => onEdit(employee)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label={`Delete ${employee.name}`} size="small" onClick={() => onDelete(employee)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}