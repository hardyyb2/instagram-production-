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
import useStyles from './Home.styles'

interface HomeProps {
  userId: string
  otherPosts: postProps[] | null
  getPostFeedConnect: () => void
  getUserDetailsConnect: () => void
}

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
            Exogram
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
