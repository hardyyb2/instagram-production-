import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  root: {},
  avatar: {
    width: '30px',
    height: '30px',
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
  },
  leftAvatar: {
    position: 'relative',
    left: '-12px',
  },
  avatarGroup: {
    paddingLeft: 15,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 12,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: theme.palette.warning.light,
    '& strong': {
      color: theme.palette.warning.dark,
    },
  },
}))
