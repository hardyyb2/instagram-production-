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
  signupButton: {
    width: '100%',
    border: '2px solid white',
    padding: '10px',
    color: theme.palette.primary.main,
    fontWeight: 'bolder',
    '&:disabled': {
      border: '2px solid rgba(0,0,0,0.2)',
    },
  },

  footer: {
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.primary.light,
    position: 'absolute',
    bottom: 0,
  },
  signupLink: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textDecoration: 'none',
    paddingLeft: '4px',
  },
  checkBox: {
    paddingLeft: '12px',
  },
  checkBoxLabel: {
    color: theme.palette.primary.main,
    paddingBottom: 5,
  },
  icon: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 16,
    height: 16,
  },
  checkedIcon: {
    backgroundColor: theme.palette.secondary.main,
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundColor: theme.palette.primary.main,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}))
