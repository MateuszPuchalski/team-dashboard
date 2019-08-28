import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("WWWWWOWOOWOWOOW");
    console.log(this.props.match);
    const { against } = this.props.match;
    console.log(against);
    return (
      <div className="logo">
        <img src={process.env.PUBLIC_URL + `/logo/${against}.png`} alt="LOGO" />
        <p>Aug. 19</p>
      </div>
    );
  }
}

export default Logo;
