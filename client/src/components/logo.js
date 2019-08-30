import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { against, date } = this.props.match;
    return (
      <div className="logo">
        <img src={process.env.PUBLIC_URL + `/logo/${against}.png`} alt="LOGO" />
        <p>{date.substring(5)}</p>
      </div>
    );
  }
}

export default Logo;
