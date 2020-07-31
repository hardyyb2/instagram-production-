import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '12px',
    maxHeight: '80px',
    margin: '10px 15px',
    position: 'relative',
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)`,
  },
  username: {
    paddingLeft: '12px',
    paddingRight: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  acceptButton: {
    background: `linear-gradient(to right, ${theme.palette.secondary.dark},${theme.palette.secondary.main})`,
    borderRadius: '6px',
    width: '100%',
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  actions: {
    position: 'absolute',
    right: '10px',
  },
}))
