import React, { Component } from "react";

class Court extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  draw() {
    let canvas = document.getElementById("court");
    let ctx = canvas.getContext("2d");

    // court outline
    ctx.strokeRect(0, 0, 300, 150);

    // curved 6m left line

    ctx.moveTo(0, 20);
    ctx.arcTo(50, 20, 50, 50, 50);
    ctx.lineTo(50, 75);

    ctx.moveTo(0, 130);
    ctx.arcTo(50, 130, 50, 100, 50);
    ctx.lineTo(50, 75);
    // mid line
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 150);

    // curved 6m right line
    ctx.moveTo(300, 20);
    ctx.arcTo(250, 20, 250, 50, 50);
    ctx.lineTo(250, 75);

    ctx.moveTo(300, 130);
    ctx.arcTo(250, 130, 250, 50, 50);
    ctx.lineTo(250, 75);

    // dashed left line
    ctx.moveTo(25, 0);
    ctx.arcTo(130, 75, 25, 150, 90);
    ctx.lineTo(25, 150);

    // dashed right line
    ctx.moveTo(275, 0);
    ctx.arcTo(170, 75, 275, 150, 90);
    ctx.lineTo(275, 150);

    ctx.stroke();
  }

  componentDidMount() {
    this.draw();
  }

  render() {
    return <canvas id="court"></canvas>;
  }
}

export default Court;
