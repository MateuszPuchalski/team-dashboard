import React, { useState, useEffect } from "react";
import "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-style";

export default function Chart(props) {
  const [goals, setGoals] = useState([]);
  const [clubNames, setClubNames] = useState([]);
  const colors = goals.map(item => {
    return item < 3 ? "red" : item < 6 ? "oragne" : "green";
  });

  const chartData = {
    data: {
      labels: clubNames,
      datasets: [
        {
          backgroundColor: "blue",
          label: "Goals",
          data: goals,
          borderColor: "red",
          borderWidth: 5,
          fill: false,
          outerGlowWidth: 25,
          outerGlowColor: "red",
          pointRadius: 0,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: { enabled: false },
      layout: {
        padding: {
          left: 50,
          right: 70,
          top: 30,
          bottom: 20
        }
      },
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          display: true,
          color: "white",
          align: "top",
          borderWidth: 2,
          borderRadius: 3,
          font: { size: 17 },
          backgroundColor: context => {
            let index = context.dataIndex;
            let value = context.dataset.data[index];
            return value < 3 ? "red" : value < 6 ? "orange" : "green";
          },
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
              suggestedMax: 12
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
  // console.log(chartData.data.datasets[0]["borderColor"]);
  // chartData.data.datasets[0]["borderColor"] = "blue";
  // console.log(chartData.data.datasets[0]["borderColor"]);

  const setGradientColor = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(
      canvas.width / 2,
      canvas.height,
      canvas.width / 2,
      0
    );
    gradient.addColorStop(0.15, "#E43025");
    gradient.addColorStop(0.3, "#DF7604");
    gradient.addColorStop(0.65, "#01C23C");
    return gradient;
  };

  const getChartData = canvas => {
    const data = chartData.data;
    data.datasets[0]["borderColor"] = setGradientColor(canvas);
    data.datasets[0]["outerGlowColor"] = setGradientColor(canvas);
    return data;
  };

  const fetchData = async id => {
    const data = await fetch(`/players/${id}/goals`);
    const items = await data.json();
    console.log(items);
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    let goals = [];
    let clubNames = [];
    items.slice(-5).forEach(element => {
      goals.push(element.goals);
      clubNames.push(element.against.substring(0, 3));
    });
    setGoals(goals);
    setClubNames(clubNames);
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="chart">
      <Line data={getChartData} options={chartData.options} />
    </div>
  );
}
