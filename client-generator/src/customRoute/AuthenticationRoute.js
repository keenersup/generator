import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export const GuestRoute = ({ component: Component, animation,...rest }) => {

  const context = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => {
        return context.user ? <Redirect to='/' /> :
            <Component{...props} />
      }}
    />
  );
}

export const AuthRoute = ({ component: Component,animation, ...rest }) => {

  const context = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => {
        return context.user ?
            <Component{...props} />
          :
          <Redirect to='/' />
      }}
    />
  );
}
