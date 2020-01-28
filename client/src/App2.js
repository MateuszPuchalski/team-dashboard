import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
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

import { ProviderAuth } from "./useAuth";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(${background});
  background-size: cover;
  overflow: hidden;
`;

export default function App2(props) {
  return (
    <Wrapper>
      <ProviderAuth>
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path={"/dashboard"} component={Dashboard} />
        </Router>
      </ProviderAuth>
    </Wrapper>
  );
}
