import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + `/logo/AZSUMCSLublinSHADOW.png`}
          alt="LOGO"
        />
        <p>Aug. 19</p>
      </div>
    );
  }
}

export default Logo;
