import React, { Component } from "react";

class ChartCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  drawCurve(elementId = "canvasLine", goals = [6, 11, 7, 10, 0]) {
    let c = document.getElementById(elementId);
    let width = 300;
    let height = 150;
    let ctx = c.getContext("2d");
    let grad = ctx.createLinearGradient(0, 50, 300, 50);
    grad.addColorStop(0.1, "orange");
    grad.addColorStop(0.3, "green");
    grad.addColorStop(0.5, "green");
    grad.addColorStop(0.7, "green");
    grad.addColorStop(1, "red");
    // ctx.shadowColor = "red";
    // ctx.shadowBlur = 5;
    ctx.strokeStyle = grad;
    // ctx.lineWidth = 3.5;
    // ctx.lineJoin = "round";
    //0-2 red 3-6 orange 7+ green
    ctx.moveTo(0, 150 - goals[0] ** 2);
    let pos = 60;
    for (let i = 1; i <= 3; i++) {
      ctx.bezierCurveTo(
        pos,
        150 - goals[i - 1] ** 2,
        pos,
        150 - goals[i] ** 2,
        pos + 30,
        150 - goals[i] ** 2
      );
      console.log(150 - goals[i] ** 2);
      pos += 60;
    }
    ctx.bezierCurveTo(
      270,
      150 - goals[3] ** 2,
      270,
      150 - goals[4] ** 2,
      300,
      150 - goals[4] ** 2
    );
    ctx.stroke();

    // ctx.bezierCurveTo(oneFifth / 4, 0, oneFifth / 4, 50, oneFifth / 2, 50);
  }

  componentDidMount() {
    this.drawCurve();
  }

  render() {
    return (
      <div className="chart">
        <canvas id="canvasLine"></canvas>
      </div>
    );
  }
}

export default ChartCanvas;
