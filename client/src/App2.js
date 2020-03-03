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
import Sidebar from "./components/Sidebar";
import ClubSettings from "./components/ClubSettings";

import { useAuth } from "./useAuth";
const Wrapper = styled.div`
  font-family: "Open Sans";
  font-size: 16px;
  color: white;

  height: 100vh;
  position: relative;
  background: #eeeeee;
  overflow: hidden;
  margin-left: 5rem;
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
    <>
      <Router>
        <Route path="/admin" component={Sidebar} />
        <Wrapper>
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
          <Route exact path="/admin/club" component={ClubSettings} />
          <Route exact path="/admin/matches" component={AdminSchowMatches} />
          <Route
            exact
            path="/admin/matches/:matchId"
            component={AdminMatches}
          />
          <Route exact path="/admin/players" component={AdminSchowPlayers} />
          <Route
            exact
            path="/admin/players/:playerId"
            component={AdminPlayers}
          />
          <PrivateRoute path={"/dashboard"} component={Dashboard} />
        </Wrapper>
      </Router>
    </>
  );
}
