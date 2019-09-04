import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function Chart(props) {
  const [goals, setGoals] = useState([]);

  const chartData = {
    data: {
      labels: ["noych", "noych", "noych", "noych", "noych"],
      datasets: [
        {
          label: "Goals",
          data: goals,
          borderColor: "red",
          borderWidth: 5,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: "white",
          align: "bottom",
          borderWidth: 2,
          borderRadius: 3,
          backgroundColor: ["red", "green", "red", "green", "green"],
          offset: 10
        }
      },
      legend: { display: false },

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
    }
  };

  const fetchData = async id => {
    const data = await fetch(`/players/${id}/goals`);
    const items = await data.json();

    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    let goals = [];
    let clubNames = [];
    items.forEach(element => {
      goals.push(element.goals);
      clubNames.push(element.against.substring(0, 3));
    });
    setGoals(goals);

    console.log(props.match.params.id);
    console.log(goals);
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="chart">
      <Line data={chartData.data} options={chartData.options} />
    </div>
  );
}
