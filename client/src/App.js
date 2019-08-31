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
        <Route path="/player/:id" component={PlayerInfo} />
        <Route path="/player/:id" component={SeasonStats} />
        <Route path="/player/:id" component={PhysicalForm} />
        <Route path="/player/:id" component={Chart} />
        <Route path="/player/:id" component={Court} />
      </div>
    );
  }
}
