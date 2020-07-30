import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Button } from '@material-ui/core'

import {
  UserActions,
  followUser,
  requestFollow,
  followUserObj,
} from '../../store/actions/userActions'
import useStyles from './FollowButton.styles'

interface IProps {
  payload: followUserObj
  design: any
  follows: boolean
  requesting: boolean
  requestFollowConnect: (payload: followUserObj) => void
}

const FollowButton: React.FC<IProps> = ({
  payload,
  design,
  follows,
  requesting,
  requestFollowConnect,
}) => {
  const classes = useStyles()
  let classFollow =
    follows || requesting ? `${classes.following} ${design} ` : `${design}`

  const handleFollowUser = () => {
    requestFollowConnect(payload)
  }
  return (
    <Button onClick={handleFollowUser} className={classFollow}>
      {follows ? 'Following' : requesting ? 'Requested' : 'Follow'}
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    requestFollowConnect: (payload: followUserObj) =>
      dispatch(requestFollow(payload)),
  }
}

export default connect(null, mapDispatchToProps)(FollowButton)
