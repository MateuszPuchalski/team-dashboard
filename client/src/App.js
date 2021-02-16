import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
//import { gql, useQuery } from "apollo-server-express";

import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

import MatchVideo from "./MatchVideo/MatchVideo";

import AdminSchowMatches from "./components/Admin/Matches/AdminSchowMatches";
import AdminSchowPlayers from "./components/Admin/Players/AdminSchowPlayers";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import ThrowAnalysis from "./ThrowAnalysis/ThrowAnalysis";
import Stats from "./Stats/Stats";
import ClubsList from "./components/ClubsList";
import ClubPage from "./components/ClubPage";

import RoleChooser from "./components/RoleChooser";
import CurrentUser from "./components/CurrentUser";
import Dabrowa from "./components/Dabrowa/Dabrowa";

export default function App(props) {
  return (
    <>
      {/* <PrivateRoute exact path="/:id">
        <Sidebar />

        <CurrentUser />
      </PrivateRoute> */}
      {/* <Route path="/:id">
      </Route> */}
      <Route path="/role" component={RoleChooser} />
      <Route path={"/throws"}>
        <Dabrowa />
      </Route>
      <Route path={"/profile"}>
        <ProfilePage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/testing">
        {/* <ThrowAnalysis /> */}
        <Stats />
      </Route>

      {/* <Route exact path="/admin/matches" component={AdminSchowMatches} /> */}
      <Route exact path="/clubs">
        <Sidebar />
        <ClubsList />
      </Route>
      <Route exact path="/clubs/:clubId">
        <Sidebar />
        <ClubPage />
      </Route>

      <Route exact path="/matches">
        <Sidebar />
        <AdminSchowMatches />
      </Route>
      <Route exact path="/matches/:matchId">
        <Sidebar />
        <MatchVideo />
      </Route>

      <Route exact path="/matches/:matchId/stats">
        <Sidebar />
        <Stats />
      </Route>
      <Route exact path="/players">
        <Sidebar />
        <AdminSchowPlayers />
      </Route>
    </>
  );
}
