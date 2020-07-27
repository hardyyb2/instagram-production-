import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
    background: theme.palette.primary.main,
  },
  container: {
    padding: 0,
  },
  button: {
    width: '100%',
    height: '100%',
  },
  addIcon: {
    background: `linear-gradient(to bottom,${theme.palette.secondary.dark} , ${theme.palette.secondary.main})`,
    color: theme.palette.primary.main,
    width: '90%',
    height: '90%',
    borderRadius: '12px',
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.19), 0 3px 6px rgba(0, 0, 0, 0.23)`,
  },
}))
