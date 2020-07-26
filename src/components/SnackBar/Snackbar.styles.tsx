import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    width: '100%',

    '& > * + *': {
      marginTop: theme.spacing(2),
      marginBottom: '10px',
    },
  },
  snackBar: {
    width: '100%',
  },
  alert: {
    width: '80%',
  },
}))
