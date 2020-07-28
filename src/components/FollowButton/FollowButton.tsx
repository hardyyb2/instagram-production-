import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Button } from '@material-ui/core'

import {
  UserActions,
  followUser,
  followUserObj,
} from '../../store/actions/userActions'
import useStyles from './FollowButton.styles'

interface IProps {
  payload: followUserObj
  followUserConnect: (payload: followUserObj) => void
}

const FollowButton: React.FC<IProps> = ({ payload, followUserConnect }) => {
  const classes = useStyles()
  const classFollow = !payload.follow
    ? `${classes.button} ${classes.following}`
    : `${classes.button}`

  const handleFollowUser = () => {
    followUserConnect(payload)
  }
  return (
    <Button onClick={handleFollowUser} className={classFollow}>
      {!payload.follow ? 'Following' : 'Follow'}
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    followUserConnect: (payload: followUserObj) =>
      dispatch(followUser(payload)),
  }
}

export default connect(null, mapDispatchToProps)(FollowButton)
