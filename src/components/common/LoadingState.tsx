import { CircularProgress, Box } from '@mui/material'

interface LoadingStateProps {
  message?: string
  size?: number
}

export const LoadingState = ({ message = 'Loading...', size = 40 }: LoadingStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      gap={2}
    >
      <CircularProgress size={size} />
      {message && <p>{message}</p>}
    </Box>
  )
}
