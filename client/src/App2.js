import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation
} from "react-router-dom";
import styled from "styled-components";

import background from "./images/backgroundmat.webp";

import Register from "./components/Register";
import Login from "./components/Login";

import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import Admin from "./components/Admin/Admin";
import AdminMatches from "./components/Admin/AdminMatches";
import AdminShowMatches from "./components/Admin/Matches/AdminSchowMatches";

import { useAuth } from "./useAuth";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(${background});
  background-size: cover;
  overflow: hidden;
`;

export default function App2(props) {
  const auth = useAuth();

  const checkAuth = () => {
    fetch("/api/auth")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        auth.setUser(data);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Wrapper>
      <Router>
        <Route exact path="/">
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="register">Register</Link>
            </li>
          </ul>
        </Route>

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/matches" component={AdminShowMatches} />
        <Route exact path="/admin/matches/:matchId" component={AdminMatches} />
        <PrivateRoute path={"/dashboard"} component={Dashboard} />
      </Router>
    </Wrapper>
  );
}
