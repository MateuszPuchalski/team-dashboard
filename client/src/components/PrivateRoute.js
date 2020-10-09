import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../auth";

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useAuth();
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? children : <Redirect to="/" />)}
    />
  );
}

export default PrivateRoute;
