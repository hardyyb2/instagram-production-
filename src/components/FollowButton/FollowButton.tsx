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
  design: any
  follows: boolean
  followUserConnect: (payload: followUserObj) => void
}

const FollowButton: React.FC<IProps> = ({
  payload,
  design,
  follows,
  followUserConnect,
}) => {
  const classes = useStyles()
  let classFollow = follows ? `${classes.following} ${design} ` : `${design}`

  const handleFollowUser = () => {
    followUserConnect(payload)
  }
  return (
    <Button onClick={handleFollowUser} className={classFollow}>
      {follows ? 'Following' : 'Follow'}
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
