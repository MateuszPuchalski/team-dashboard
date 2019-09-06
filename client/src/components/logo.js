import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { against, date } = this.props.match;
    return (
      <>
        <img
          className="logo"
          src={process.env.PUBLIC_URL + `/logo/${against}.png`}
          alt="LOGO"
        />
        {/* <p>{date.substring(5)}</p> */}
      </>
    );
  }
}

export default Logo;
