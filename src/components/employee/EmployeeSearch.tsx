import { Box, TextField, Button, Stack, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

interface EmployeeSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: (id: string) => void
  onClear: () => void
  loading?: boolean
}

export const EmployeeSearch = ({ value, onChange, onSearch, onClear, loading = false }: EmployeeSearchProps) => {
  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim())
    }
  }

  const handleClear = () => {
    onChange('')
    onClear()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 1,
        border: '1px solid #e0e0e0',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end">
        <TextField
          label="Employee ID"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          placeholder="Enter employee ID..."
          fullWidth
          size="small"
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            onClick={handleSearch}
            disabled={loading || !value.trim()}
            sx={{ minWidth: 100 }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
