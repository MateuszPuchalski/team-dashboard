import React, { useEffect } from "react";
import styled from "styled-components";

import EfficiencyCard from "./EfficiencyCard";
import MatchesTest from "./MatchesTest";
import AddClub from "./AddClub";
import Club from "./Club";
import Sidebar from "./Sidebar";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";

const Wrapper = styled.div`
  width: 90vw;
  height: 90vh;
  margin: auto;
  margin-top: 2vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  /* background: linear-gradient(
    to top,
    #dd1818,
    #333333
  );  */

  font-family: "Alata", sans-serif;
`;

export default function Dashboard() {
  const match = useRouteMatch();

  useEffect(() => {
    console.log(match.url);
  }, []);
  return (
    <Wrapper>
      <h1>Dashboard</h1>
      <Sidebar />
      <Switch>
        <Route exact path={`/dashboard/club`} component={Club} />
      </Switch>
    </Wrapper>
  );
}
