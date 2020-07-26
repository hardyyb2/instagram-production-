import { makeStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    marginBottom: '10px',
  },
  wrapper: {},
  imageContainer: {
    width: '50px',
    maxWidth: '50px',
    height: '50px',
    maxHeight: '50px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    overflow: 'hidden',
    marginRight: '30px',
  },
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  user: {
    color: theme.palette.warning.dark,
    fontWeight: 'bolder',
    maxWidth: '100%',
    wordBreak: 'break-all',
  },
  comment: {
    color: theme.palette.warning.light,
    maxWidth: '100%',
    wordBreak: 'break-all',
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
}))
