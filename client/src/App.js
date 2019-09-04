import React, { Component } from "react";
import Sidebar from "./components/sidebar";
import PlayerInfo from "./components/playerinfo";
import SeasonStats from "./components/seasonStats";
import PhysicalForm from "./components/physicalForm";
import Chart from "./components/chart";
import Court from "./components/court";

import { Switch, Route } from "react-router-dom";
import "./normalize.css";
import "./main.css";

export default class App extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <Route path="/players/:id" component={PlayerInfo} />
        <Route path="/players/:id" component={SeasonStats} />
        <Route path="/players/:id" component={PhysicalForm} />
        <Route path="/players/:id" component={Court} />
        <Route path="/players/:id" component={Chart} />
      </div>
    );
  }
}
