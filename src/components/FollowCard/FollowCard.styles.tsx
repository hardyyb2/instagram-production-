import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  container: {},
  root: {
    padding: 12,
    background: theme.palette.primary.main,
    maxHeight: '250px',
  },
  image: {
    border: `6px solid ${theme.palette.primary.main}`,
  },
  username: {
    paddingTop: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bolder',
  },
  paper: {
    padding: 0,
    width: '100%',
    borderRadius: '25px',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  followButtonWrapper: {
    padding: '15px ',
  },
}))
