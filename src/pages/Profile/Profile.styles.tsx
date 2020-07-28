import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
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
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  details: {
    padding: '30px 30px 5px 30px',
  },
  imageContainer: {
    width: '70px',
    height: '70px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    overflow: 'hidden',
    marginRight: '20px',
  },
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
  },
  userName: {
    fontSize: '1.4rem',
    fontWeight: 'bolder',
  },
  bio: {
    fontWeight: 'bold',
    color: theme.palette.warning.light,
  },
  editProfile: {
    padding: '10px 30px 30px 30px',
    display: 'flex',
    width: '100%',
    margin: 'auto',
  },
  editProfileButton: {
    background: `linear-gradient(to right, ${theme.palette.secondary.dark},${theme.palette.secondary.main})`,
    borderRadius: '12px',
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    fontWeight: 'bolder',
    padding: '10px 0px',
    width: '100%',
    maxHeight: '46px',
    margin: 'auto',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    margin: '0px 30px 0px 30px',
    borderTop: `0.02px solid rgba(0,0,0,0.12)`,
    borderBottom: `0.02px solid rgba(0,0,0,0.12)`,
  },
  statsContainer: {
    alignItems: 'center',
    flex: '1 1 auto',
  },
  statsNumber: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
  },
  statsText: {
    fontWeight: 'bolder',
    color: theme.palette.warning.light,
  },
  actionButtons: {
    padding: '25px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 auto',
  },
  followButton: {
    background: `linear-gradient(to right, ${theme.palette.secondary.dark},${theme.palette.secondary.main})`,
    borderRadius: '12px',
    width: '80%',
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    fontWeight: 'bolder',
  },
  messageButton: {
    background: theme.palette.warning.light,
    borderRadius: '12px',
    color: theme.palette.primary.main,
  },
  postContainer: {
    padding: '20px 10px',
    flex: '1 1 auto',
  },
  postWrapper: {
    padding: '5px',
    height: '120px',
    borderRadius: '25px',
    overflow: 'hidden',
  },
  postImage: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  wave: {
    background: 'rgba(250,69,0,0.1)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, rgba(250,69,0,0.1) , transparent)`,
    },
  },
  skeleton: {
    borderRadius: 20,
    height: '80px',
  },
  noPostsContainer: {
    alignItems: 'center',
  },
  noPostsIcon: {
    color: theme.palette.warning.dark,
    border: `2px solid ${theme.palette.warning.dark}`,
    padding: '20px',
    fontSize: '60px',
    borderRadius: '50%',
  },
  noPostsText: {
    color: theme.palette.warning.dark,
  },
}))
