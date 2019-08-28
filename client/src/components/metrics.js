import React, { Component } from "react";

class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculate_age(dob) {
    let stringDateToArr = dob.split("-");
    let diff_ms = Date.now() - new Date(...stringDateToArr).getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  render() {
    let age = this.calculate_age(this.props.age);
    return (
      <div className="metrics">
        <div>
          <h1>{age}</h1>
          <p>YR</p>
        </div>
        <div className="withBorder">
          <h1>{this.props.height}</h1>
          <p>CM</p>
        </div>
        <div>
          <h1>{this.props.weight}</h1>
          <p>KG</p>
        </div>
      </div>
    );
  }
}

export default Metrics;
