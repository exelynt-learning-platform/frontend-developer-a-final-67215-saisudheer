import { Snackbar, Alert } from '@mui/material'
import type { AlertColor } from '@mui/material'

interface NotificationProps {
  open: boolean
  message: string
  severity?: AlertColor
  autoHideDuration?: number
  onClose: () => void
}

export const Notification = ({
  open,
  message,
  severity = 'success',
  autoHideDuration = 6000,
  onClose,
}: NotificationProps) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
