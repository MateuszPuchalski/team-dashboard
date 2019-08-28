import React, { Component } from "react";

class SeasonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="seasonStats">
        <h2>SEASON STATS</h2>
        <p>
          Appearances: <span>10</span>
        </p>
        <p>
          Goals: <span>100</span>
        </p>
        <p>
          Shots (per game): <span>14</span>
        </p>
        <p>
          Shot Accuracy: <span>72%</span>
        </p>
      </div>
    );
  }
}

export default SeasonStats;
