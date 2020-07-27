import React, { lazy, Suspense, useEffect } from 'react'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Switch } from 'react-router-dom'

import {
  AuthenticateAction,
  setAuthenticated,
} from './store/actions/authActions'
import { PublicRoute, ProtectedRoute } from './utils'
import Spinner from './UX/Spinner/Spinner'
import { IState } from './store/types'

import { UITheme } from './UX'
import './App.css'
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const Signup = lazy(() => import('./pages/Auth/Signup/Signup'))
const Logout = lazy(() => import('./pages/Auth/Logout/Logout'))
const Landing = lazy(() => import('./pages/Landing/Landing'))
const Home = lazy(() => import('./pages/Home/Home'))
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Post = lazy(() => import('./pages/Post/Post'))
const AddPost = lazy(() => import('./pages/AddPost/AddPost'))

export const LoadingScreen: React.FC<{}> = () => (
  <Grid container justify='center' className={`LoadingScreen`}>
    <Spinner />
  </Grid>
)

interface IProps {
  isAuthenticated: boolean | null
  isVerifying: boolean | null
  setAuthRequest: (token: string | null) => void
}

const App: React.FC<IProps> = ({
  isAuthenticated,
  isVerifying,
  setAuthRequest,
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthRequest(token)
    } else {
      setAuthRequest(null)
    }
  }, [])

  return (
    <UITheme>
      <Switch>
        <Suspense fallback={<LoadingScreen />}>
          <ProtectedRoute
            exact
            path='/logout'
            component={Logout}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path='/editprofile'
            component={EditProfile}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            noNavigation
          />
          <ProtectedRoute
            exact
            path='/home'
            component={Home}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />

          <ProtectedRoute
            exact
            path='/profile'
            component={Profile}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path='/post'
            component={Post}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            noNavigation
          />
          <ProtectedRoute
            exact
            path='/addpost'
            component={AddPost}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            noNavigation
          />
          <PublicRoute path='/login' exact={true} component={Login} />
          <PublicRoute path='/signup' exact={true} component={Signup} />
          <PublicRoute path='/' exact component={Login} />
        </Suspense>
      </Switch>
    </UITheme>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AuthenticateAction, {}, any>
) => {
  return {
    setAuthRequest: (token: string | null) => dispatch(setAuthenticated(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
