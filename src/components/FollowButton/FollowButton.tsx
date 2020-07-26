import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import {
  UserActions,
  followUser,
  followUserObj,
} from '../../store/actions/userActions'

interface IProps {
  payload: followUserObj
  followUserConnect: (payload: followUserObj) => void
}

const FollowButton: React.FC<IProps> = ({ payload, followUserConnect }) => {
  const handleFollowUser = () => {
    followUserConnect(payload)
  }
  return <button onClick={handleFollowUser}>Follow </button>
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions, {}, any>) => {
  return {
    followUserConnect: (payload: followUserObj) =>
      dispatch(followUser(payload)),
  }
}

export default connect(null, mapDispatchToProps)(FollowButton)
