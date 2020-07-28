import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  root: {
    fontWeight: 'bold',
    '& p': { margin: 0, color: theme.palette.warning.light },
    padding: '0px 20px 20px 25px',
    '& strong': {
      fontSize: '1.2rem',
      paddingRight: '15px',
      color: theme.palette.warning.dark,
    },
  },
}))
