import React, { Component } from "react";
import { Line } from "react-chartjs-2";
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["UMCS Lublin", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
          {
            label: "# of Goals",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 2,
                suggestedMin: 0,
                suggestedMax: 10
              },
              gridLines: { display: false }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      },
      urlPlayerId: null,
      isLoading: true
    };
  }

  fetchData() {
    fetch(`/players/${this.props.match.params.id}/goals`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let arr = [];
        data.forEach(element => {
          arr.push(element.goals);
        });
        console.log(arr);
        this.setState({
          data: {
            labels: ["UMCS Lublin", "Blue", "Yellow", "Green", "Purple"],
            datasets: [
              {
                label: "# of Goals",
                data: arr,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          isLoading: false,
          urlPlayerId: this.props.match.params.id
        });
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
    const { isLoading } = this.state;
    return (
      <div className="chart">
        {!isLoading ? (
          <Line data={this.state.data} options={this.state.options} />
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default Chart;
