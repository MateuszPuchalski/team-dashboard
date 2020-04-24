import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";

import Register from "./components/Login/Register";
import Login from "./components/Login";
import Login2 from "./components/Login/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import Admin from "./components/Admin/Admin";
import AdminMatches from "./components/Admin/AdminMatches";
import AdminPlayers from "./components/Admin/AdminPlayers";
import EditAdminPlayers from "./components/Admin/EditAdminPlayers";
import AdminSchowMatches from "./components/Admin/Matches/AdminSchowMatches";
import AdminSchowPlayers from "./components/Admin/Players/AdminSchowPlayers";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ClubSettings from "./components/ClubSettings";

import { useSelector, useDispatch } from "react-redux";
import { setTestField } from "./_actions/test.actions";

export default function App(props) {
  return (
    <>
      <Route path="/admin" component={Sidebar} />
      <PrivateRoute path={"/profile"}>
        <ProfilePage />
      </PrivateRoute>

      <Route exact path="/">
        <Login2 />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register" component={Register} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/club" component={ClubSettings} />
      <Route exact path="/admin/matches" component={AdminSchowMatches} />
      <Route exact path="/admin/matches/:matchId" component={AdminMatches} />
      <Route exact path="/admin/players" component={AdminSchowPlayers} />
      <Route exact path="/admin/players/:playerId" component={AdminPlayers} />
      <Route
        exact
        path="/admin/players/:playerId/edit"
        component={EditAdminPlayers}
      />
      <PrivateRoute path={"/dashboard"}>
        <Dashboard />
      </PrivateRoute>
    </>
  );
}
