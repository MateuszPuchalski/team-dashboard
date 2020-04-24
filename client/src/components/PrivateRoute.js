import React from "react";

import { Route, Redirect } from "react-router-dom";
const fakeAuth = () => {
  return true;
};
export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        sessionStorage.getItem("user") ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}
