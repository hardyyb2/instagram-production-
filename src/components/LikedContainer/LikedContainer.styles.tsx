import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  root: {},
  avatar: {
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '12px',
  },
  leftAvatar: {
    position: 'relative',
    left: '-25px',
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
