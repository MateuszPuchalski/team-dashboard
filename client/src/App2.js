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
import EditAdminPlayers from "./components/Admin/EditAdminPlayers";
import AdminSchowMatches from "./components/Admin/Matches/AdminSchowMatches";
import AdminSchowPlayers from "./components/Admin/Players/AdminSchowPlayers";
import Sidebar from "./components/Sidebar";
import ClubSettings from "./components/ClubSettings";

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
          <Route
            exact
            path="/admin/players/:playerId/edit"
            component={EditAdminPlayers}
          />
          <PrivateRoute path={"/dashboard"} component={Dashboard} />
        </Wrapper>
      </Router>
    </>
  );
}
