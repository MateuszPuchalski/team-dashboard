import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { against } = this.props.match;
    return (
      <div className="logo">
        <img src={process.env.PUBLIC_URL + `/logo/${against}.png`} alt="LOGO" />
        <p>Aug. 19</p>
      </div>
    );
  }
}

export default Logo;
