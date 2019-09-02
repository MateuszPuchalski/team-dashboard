import React, { Component } from "react";
import { Line } from "react-chartjs-2";
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: "Goals",
            data: [],
            backgroundColor: [],
            borderColor: [],
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
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        let goals = [];
        let clubNames = [];
        data.forEach(element => {
          goals.push(element.goals);
          clubNames.push(element.against.substring(0, 3));
        });
        this.setState({
          data: {
            labels: clubNames,
            datasets: [
              {
                label: "Goals",
                data: goals,
                backgroundColor: [],
                borderColor: ["red"],
                borderWidth: 5,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            tooltips: {
              enabled: true,
              backgroundColor: "red"
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    display: false,
                    beginAtZero: true,
                    stepSize: 2,
                    suggestedMin: 0,
                    suggestedMax: 10
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
                }
              ],
              xAxes: [
                {
                  ticks: { display: false },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
                }
              ]
            }
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
