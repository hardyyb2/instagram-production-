import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { IState } from '../../store/types'

interface IProps {
  isAuthenticated: boolean | null
}

const Landing: React.FC<IProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/home' />
  } else {
    return (
      <div>
        This is landing page
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Link to='/logout'>
          <button>Logout</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Landing)
