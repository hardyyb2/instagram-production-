import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import {
  Grid,
  makeStyles,
  AppBar,
  IconButton,
  Typography,
} from '@material-ui/core'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import TelegramIcon from '@material-ui/icons/Telegram'

import { IState } from '../../store/types'
import { UserActions, getUserDetails } from '../../store/actions/'
import { getPostFeed, postProps } from '../../store/actions'
import { Cards } from '../../components'
import { CardSkeleton } from '../../UX'

interface HomeProps {
  userId: string
  otherPosts: postProps[] | null
  getPostFeedConnect: () => void
  getUserDetailsConnect: () => void
}

export const useStyles = makeStyles((theme) => ({
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

const Home: React.FC<HomeProps> = ({
  userId,
  otherPosts,
  getPostFeedConnect,
  getUserDetailsConnect,
}) => {
  const classes = useStyles()

  useEffect(() => {
    Promise.all([getUserDetailsConnect(), getPostFeedConnect()])
  }, [])

  return (
    <Grid container item xs={12} sm={12} className={classes.root}>
      <Grid container item className={classes.header} xs={12} sm={12}>
        <AppBar position='sticky' className={classes.appBar}>
          <IconButton
            edge='start'
            className={classes.camera}
            color='inherit'
            aria-label='camera'
            disabled
          >
            <CameraAltIcon fontSize='large' />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Insta Clone
          </Typography>
          <IconButton
            className={classes.message}
            color='inherit'
            aria-label='message'
            disabled
          >
            <TelegramIcon fontSize='large' />
          </IconButton>
        </AppBar>
      </Grid>
      <Grid container item xs={12} sm={12} className={classes.body}>
        {otherPosts ? (
          <Cards posts={otherPosts} />
        ) : (
          Array(9)
            .fill(undefined)
            .map((arr, index) => <CardSkeleton key={index} />)
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    otherPosts: state.post.otherPosts,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    getPostFeedConnect: () => dispatch(getPostFeed()),
    getUserDetailsConnect: () => dispatch(getUserDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
