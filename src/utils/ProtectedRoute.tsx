import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LoadingScreen } from '../App'

import { Layout } from '../hoc'

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>
  isAuthenticated: boolean | null
  isVerifying: boolean | null
  noNavigation?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  noNavigation = false,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <LoadingScreen />
      ) : isAuthenticated ? (
        noNavigation ? (
          <Component {...props} />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
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
