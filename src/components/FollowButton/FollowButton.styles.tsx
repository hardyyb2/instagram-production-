import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  button: {
    background: `linear-gradient(to right, ${theme.palette.secondary.dark},${theme.palette.secondary.main})`,
    borderRadius: '6px',
    width: '100%',
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  following: {
    background: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.dark,
  },
}))
