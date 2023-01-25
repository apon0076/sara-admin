import React from "react"
import { Route } from "react-router-dom"
import Meta from '../../utils/Meta'

const AuthLayout = ({ children }) => 
<div><Meta title="SaRa Marketplace - Admin" />{children}</div>;

const AuthLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  )
}

export default AuthLayoutRoute
