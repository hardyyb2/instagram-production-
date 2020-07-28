import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Grid, AppBar, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { IState } from '../../store/types'
import {
  UserActions,
  getUserFeed,
  UserProps,
  userFeedUsers,
} from '../../store/actions/'
import { FollowCard } from '../../components'
import useStyles from './Explore.styles'

interface IProps {
  user: UserProps
  userFeed: userFeedUsers[] | null
  getUserFeedConnect: () => void
}

const Explore: React.FC<IProps> = ({ user, userFeed, getUserFeedConnect }) => {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    getUserFeedConnect()
  }, [])

  const handleBackClick = () => {
    history.goBack()
  }

  return (
    <Grid container item xs={12} sm={12} className={classes.root}>
      <Grid container item className={classes.header} xs={12} sm={12}>
        <AppBar position='sticky' className={classes.appBar}>
          <IconButton
            edge='start'
            className={classes.camera}
            color='inherit'
            aria-label='back'
            onClick={handleBackClick}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Explore
          </Typography>
          <IconButton
            className={classes.message}
            color='inherit'
            aria-label='message'
            disabled
          ></IconButton>
        </AppBar>
      </Grid>
      <Grid container item xs={12} sm={12} className={classes.body}>
        <FollowCard user={user} userFeed={userFeed} />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user.user,
    userFeed: state.user.userFeed,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    getUserFeedConnect: () => dispatch(getUserFeed()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
