import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import useStyles from './Snackbar.styles'

interface IProps {
  open: boolean
  duration?: number
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  handleClose: (event?: React.SyntheticEvent, reason?: string) => void
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const CustomizedSnackbar: React.FC<IProps> = ({
  open,
  duration = 5000,
  type = 'success',
  message,
  handleClose,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        className={classes.snackBar}
      >
        <Alert onClose={handleClose} severity={type} className={classes.alert}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomizedSnackbar
