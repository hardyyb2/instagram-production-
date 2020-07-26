import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LoadingScreen } from '../App'

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>
  isAuthenticated: boolean | null
  isVerifying: boolean | null
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <LoadingScreen />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

export default ProtectedRoute
