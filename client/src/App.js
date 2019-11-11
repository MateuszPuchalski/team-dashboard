import React, { Component } from "react";
import Sidebar from "./components/sidebar";
import PlayerInfo from "./components/playerinfo";
import SeasonStats from "./components/seasonStats";
import PhysicalForm from "./components/physicalForm";
import Chart from "./components/chart";
import Court from "./components/court";
import Header from "./components/header";
import Match from "./components/match";
import Comparison from "./components/comparison";

import { Switch, Route } from "react-router-dom";
import "./normalize.css";
import "./main.css";
import "./finalcss.css";

export default class App extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <Header />

        <Route path="/players/:id" component={Comparison} />
        <Route path="/matches/:id" component={Match} />
        <Route path="/players/:id" component={PlayerInfo} />
        <Route path="/players/:id" component={SeasonStats} />
        <Route path="/players/:id" component={Court} />
        <Route path="/players/:id">
          <div className="physicalFormWithChart">
            <Route path="/players/:id" component={PhysicalForm} />
            <Route path="/players/:id" component={Chart} />
          </div>
        </Route>
      </div>
    );
  }
}
