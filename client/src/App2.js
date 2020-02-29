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
import AdminPlayers from "./components/Admin/AdminPlayers";
import AdminSchowMatches from "./components/Admin/Matches/AdminSchowMatches";
import AdminSchowPlayers from "./components/Admin/Players/AdminSchowPlayers";

import { useAuth } from "./useAuth";
const Wrapper = styled.div`
  color: white;
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
        <Route exact path="/admin/matches" component={AdminSchowMatches} />
        <Route exact path="/admin/matches/:matchId" component={AdminMatches} />
        <Route exact path="/admin/players" component={AdminSchowPlayers} />
        <Route exact path="/admin/players/:playerId" component={AdminPlayers} />
        <PrivateRoute path={"/dashboard"} component={Dashboard} />
      </Router>
    </Wrapper>
  );
}
