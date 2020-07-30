import React from 'react'
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
} from '../../store/actions'
import useStyles from './Activity.styles'
import { UsercardContainer } from '../../components'

interface IProps {
  user: UserProps
  userFeed: userFeedUsers[] | null
  getUserFeedConnect: () => void
}

const Activity: React.FC<IProps> = ({ user, userFeed, getUserFeedConnect }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleBackClick = () => {
    history.goBack()
  }

  return (
    <Grid container item xs={12} sm={12} className={classes.root}>
      <UsercardContainer
        users={user.requested}
        type='Activity'
        showAcceptButton={true}
        handleClose={() => {}}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
