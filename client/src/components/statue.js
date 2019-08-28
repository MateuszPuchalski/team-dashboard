import React, { Component } from "react";

class Statue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="statue">
        <h1>{this.props.nr}</h1>
        <img
          src={
            process.env.PUBLIC_URL +
            `/statues/${this.props.name}${this.props.surname}Statue-edit2.png`
          }
          alt=""
        />
      </div>
    );
  }
}

export default Statue;
