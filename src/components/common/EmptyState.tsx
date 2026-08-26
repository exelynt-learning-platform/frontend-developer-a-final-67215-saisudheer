import { Box, Typography, Button } from '@mui/material'

interface EmptyStateProps {
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({ title, message, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="300px"
      gap={2}
      textAlign="center"
      padding={3}
    >
      <Typography variant="h5" component="h2" fontWeight={600}>
        {title}
      </Typography>
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}
