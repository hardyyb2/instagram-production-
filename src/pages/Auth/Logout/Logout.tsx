import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ThunkDispatch as Dispatch } from 'redux-thunk'

import { logoutUser } from '../../../store/actions/authActions'
import { AuthenticateAction } from '../../../store/actions/authActions'
import { IState } from '../../../store/types'

interface LogoutProps {
  loading: boolean
  error?: string | null
  isAuthenticated: boolean | null
  logoutUserConnect: () => void
}
const Logout: React.FC<LogoutProps> = ({
  loading,
  isAuthenticated,
  logoutUserConnect,
}) => {
  const handleLogout = () => {
    logoutUserConnect()
  }

  if (!isAuthenticated) {
    return <Redirect to='/' />
  } else {
    return (
      <>
        <p>Logout</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  return {
    logoutUserConnect: () => dispatch(logoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
