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
      let className = `sidebar__item sidebar__item--${i + 1}`;
      avatars.push(<Avatar id={i} className={className} />);
    }
    return (
      <div className="sidebar">
        <img src={process.env.PUBLIC_URL + `/herb.png`} id="herb" alt="herb" />
        {avatars}
        <img
          src={process.env.PUBLIC_URL + `/whitearrow.png`}
          className="sidebar__item sidebar__item--8"
          alt="herb"
        />
      </div>
    );
  }
}

export default Sidebar;
