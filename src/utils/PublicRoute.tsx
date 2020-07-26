import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PublicRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => <Route {...rest} render={(otherProps) => <Component {...otherProps} />} />

export default PublicRoute
