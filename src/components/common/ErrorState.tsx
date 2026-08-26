import { Box, Typography, Button, Alert } from '@mui/material'

interface ErrorStateProps {
  title: string
  message: string
  actionLabel?: string
  onRetry?: () => void
}

export const ErrorState = ({ title, message, actionLabel = 'Retry', onRetry }: ErrorStateProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Alert severity="error">
        <Typography variant="h6" component="h3" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Alert>
      {onRetry && (
        <Box>
          <Button variant="contained" color="error" onClick={onRetry}>
            {actionLabel}
          </Button>
        </Box>
      )}
    </Box>
  )
}
