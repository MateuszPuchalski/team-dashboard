import React, { Component } from "react";
import Logo from "./logo";

class PhysicalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="physicalForm">
        <Logo />
        <Logo />
        <Logo />
        <Logo />
        <Logo />
      </div>
    );
  }
}

export default PhysicalForm;
