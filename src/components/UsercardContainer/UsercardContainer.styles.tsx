import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  header: {
    flex: '0 1 auto',
  },
  formHeader: {
    flex: '0 1 auto',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: theme.palette.primary.main,
    boxShadow: 'none',
  },
  camera: {
    color: theme.palette.warning.dark,
  },
  title: {
    color: theme.palette.warning.dark,
    fontSize: '1.8rem',
    fontFamily: 'cursive',
  },
  message: {
    color: theme.palette.warning.dark,
  },
  body: {
    background: theme.palette.primary.main,
    flex: '1 1 auto',
    overflowY: 'scroll',
  },
  form: {
    width: '100%',
    padding: '40px',
  },
  textField: {
    width: '100%',
    borderRadius: '12px',
    borderColor: theme.palette.secondary.main,
  },
  saveButton: {
    width: '100%',
    padding: '10px',
    fontSize: '1.2rem',
    textTransform: 'capitalize',
    margin: '20px 0px',
    background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
    color: theme.palette.primary.main,
    '&:disabled': {
      color: theme.palette.primary.light,
      background: 'lightgray',
    },
  },
  input: {},
  focused: {
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
  },
  label: {
    color: theme.palette.warning.light,
  },
  labelfocused: {
    color: `${theme.palette.warning.light} !important`,
  },
  profileImage: {
    marginTop: 80,
  },
}))
