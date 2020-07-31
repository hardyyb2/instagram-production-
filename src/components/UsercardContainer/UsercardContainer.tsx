import React from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { Grid, AppBar, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { IState } from '../../store/types'
import {
  userFeedUsers,
  UserActions,
  addFollowerObj,
  addFollower,
  requestFollow,
} from '../../store/actions'

import { UserCard } from '..'
import useStyles from './UsercardContainer.styles'

interface IProps {
  users: (string | userFeedUsers)[] | null
  type: string
  showAcceptButton?: boolean
  addFollowerConnect: (payload: addFollowerObj) => void
  requestFollowConnect: (payload: addFollowerObj) => void
  handleClose: () => void
}

const UsercardContainer: React.FC<IProps> = ({
  users,
  type,
  showAcceptButton,
  addFollowerConnect,
  requestFollowConnect,
  handleClose,
}) => {
  const classes = useStyles()

  const handleBackClick = () => {
    handleClose()
  }

  const handleAcceptRequest = (userId: string) => {
    addFollowerConnect({
      userId,
      follow: true,
    })
  }

  const handleRejectRequest = (userId: string) => {
    requestFollowConnect({
      userId,
      follow: false,
      removeRequest: true,
    })
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
            {type}
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
        <UserCard
          users={users}
          showAcceptButton={showAcceptButton}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    addFollowerConnect: (payload: addFollowerObj) =>
      dispatch(addFollower(payload)),
    requestFollowConnect: (payload: addFollowerObj) =>
      dispatch(requestFollow(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsercardContainer)
