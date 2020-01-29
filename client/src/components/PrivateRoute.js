import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../useAuth";
export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        const currentUser = localStorage.getItem("currentUser");
        console.log({ currentUser: currentUser });
        if (currentUser) {
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
