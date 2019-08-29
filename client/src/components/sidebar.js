import React, { Component } from "react";
import Avatar from "./avatar";
import "../main.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let avatars = [];

    for (let i = 1; i <= 6; i++) {
      avatars.push(<Avatar id={i} />);
    }
    return (
      <div className="sidebar">
        <img src={process.env.PUBLIC_URL + `/herb.png`} id="herb" alt="herb" />
        {avatars}
      </div>
    );
  }
}

export default Sidebar;
