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
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)`,
  },
  username: {
    paddingLeft: '12px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
}))
