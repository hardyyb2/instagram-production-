import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { Button } from '@material-ui/core'

import {
  UserActions,
  addFollower,
  requestFollow,
  addFollowerObj,
} from '../../store/actions/userActions'
import useStyles from './FollowButton.styles'

interface IProps {
  payload: addFollowerObj
  design: any
  follows: boolean
  requesting: boolean
  addFollowerConnect: (payload: addFollowerObj) => void
  requestFollowConnect: (payload: addFollowerObj) => void
}

const FollowButton: React.FC<IProps> = ({
  payload,
  design,
  follows,
  requesting,
  addFollowerConnect,
  requestFollowConnect,
}) => {
  const classes = useStyles()
  let classFollow =
    follows || requesting ? `${classes.following} ${design} ` : `${design}`

  const handleaddFollower = () => {
    if (follows) addFollowerConnect({ userId: payload.userId, follow: false })
    else if (requesting)
      requestFollowConnect({ userId: payload.userId, follow: false })
    else if (!requesting && !follows)
      requestFollowConnect({ userId: payload.userId, follow: true })
  }
  return (
    <Button onClick={handleaddFollower} className={classFollow}>
      {follows ? 'Following' : requesting ? 'Requested' : 'Follow'}
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    requestFollowConnect: (payload: addFollowerObj) =>
      dispatch(requestFollow(payload)),
    addFollowerConnect: (payload: addFollowerObj) =>
      dispatch(addFollower(payload)),
  }
}

export default connect(null, mapDispatchToProps)(FollowButton)
