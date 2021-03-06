import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    background: `linear-gradient(to bottom,${theme.palette.secondary.dark} , ${theme.palette.secondary.main})`,
    alignItems: 'center',
    minHeight: '100vh',
  },
  appbar: {
    padding: '20px',
    fontSize: '2.7rem',
    background: 'transparent',
    fontFamily: 'monotype corsiva',
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  subHeader: {
    textAlign: 'center',
    color: theme.palette.primary.light,
    marginBottom: '15px',
  },
  loginButton: {
    width: '100%',
    border: '2px solid white',
    padding: '10px',
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
    '&:disabled': {
      border: '2px solid rgba(0,0,0,0.2)',
    },
  },
  subFooter: {
    textAlign: 'center',
    color: theme.palette.primary.light,
    marginBottom: '15px',
    fontSize: '0.75rem',
    marginTop: '12px',
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.primary.light,
    position: 'absolute',
    bottom: 0,
  },
  loginLink: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
    paddingLeft: '4px',
  },
}))
