import React, { Component } from "react";

class Court extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      isLoading: true,
      urlPlayerId: null
    };
  }

  draw() {
    let canvas = document.getElementById("court");
    let ctx = canvas.getContext("2d");
    ctx.setLineDash([]);
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

  drawPositions() {
    let canvas = document.getElementById("court");
    let ctx = canvas.getContext("2d");
    ctx.setLineDash([]);
    //positions
    const positions = {
      Bramkarz: [7, 75],
      "Lewe Skrzydło": [290, 10],
      "Prawe Skrzydło": [290, 140],
      "Prawe Rozegranie": [230, 130],
      "Lewe Rozegranie": [230, 20],
      "Środkowy Rozgrywający": [200, 74],
      Obrotowy: [242, 75]
    };

    for (let key in positions) {
      console.log(positions[key]);
      ctx.beginPath();
      ctx.arc(positions[key][0], positions[key][1], 7, 0, 2 * Math.PI);
      if (this.state.position == key) {
        ctx.fill();
      }
      ctx.stroke();
    }
  }
  clear() {
    const canvas = document.getElementById("court");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  fetchData() {
    fetch(`/players/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...data[0],
          isLoading: false,
          urlPlayerId: this.props.match.params.id
        });
        this.clear();
        this.draw();
        this.drawPositions();
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id != this.state.urlPlayerId) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div className="court">
        <h3>PLAYING POSITON</h3>
        <canvas id="court"></canvas>
      </div>
    );
  }
}

export default Court;
