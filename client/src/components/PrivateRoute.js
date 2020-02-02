import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../useAuth";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  const currentUser = localStorage.currentUser;
  return (
    <Route
      {...rest}
      render={props => {
        console.log({ currentUser: currentUser });
        if (currentUser || user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    ></Route>
  );
}
