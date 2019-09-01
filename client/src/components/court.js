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
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.arcTo(50, 20, 50, 50, 50);
    ctx.lineTo(50, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.arcTo(50, 130, 50, 100, 50);
    ctx.lineTo(50, 75);
    ctx.stroke();

    // mid line
    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 150);
    ctx.stroke();

    // curved 6m right line
    ctx.beginPath();
    ctx.moveTo(300, 20);
    ctx.arcTo(250, 20, 250, 50, 50);
    ctx.lineTo(250, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 130);
    ctx.arcTo(250, 130, 250, 50, 50);
    ctx.lineTo(250, 75);
    ctx.stroke();

    //positions

    //goalkeeper
    ctx.beginPath();
    ctx.arc(7, 75, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //left wing
    ctx.beginPath();
    ctx.arc(290, 10, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //right wing
    ctx.beginPath();
    ctx.arc(290, 140, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //right play
    ctx.beginPath();
    ctx.arc(230, 20, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    //playmaker
    ctx.beginPath();
    ctx.arc(200, 75, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //pivot
    ctx.beginPath();
    ctx.arc(250, 75, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //left play
    ctx.beginPath();
    ctx.arc(230, 130, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // dashed left line
    ctx.beginPath();
    ctx.moveTo(25, 0);
    ctx.setLineDash([5, 15]);
    ctx.arcTo(130, 75, 25, 150, 90);
    ctx.lineTo(25, 150);
    ctx.stroke();

    // dashed right line
    ctx.beginPath();
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
