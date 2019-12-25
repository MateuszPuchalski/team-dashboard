import React from "react";
import { Chart } from "chart.js";
import { useState, useEffect, useRef, useContext } from "react";
import countBy from "lodash/countBy";

import { UserContext } from "../UserContext";

Chart.defaults.global.defaultFontColor = "White";

export default function Stats(props) {
  const [testData, setTestData] = useState([2, 3, 4, 5]);
  const [fetchedData, setFetchedData] = useState();
  const [players, setPlayers] = useState();

  const user = useContext(UserContext);

  const canvasRef = useRef();
  const pieCanvasRef = useRef();
  useEffect(() => {
    console.log({ fetchedData: fetchedData, players: players });
    if (players) {
      console.log(players.id);
    }
  }, [fetchedData, players]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/players").then(res => res.json());
      setPlayers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/matches/16").then(res => res.json());
      setFetchedData(data);
    };
    fetchData();
  }, []);

  // Pie chart with throws
  useEffect(() => {
    let madeThrows, missThrows;
    if (fetchedData) {
      madeThrows = fetchedData.filter(
        log => log.log == "throw" && log.throw_acc == 1
      ).length;
      missThrows = fetchedData.filter(
        log => log.log == "throw" && log.throw_acc == 0
      ).length;
    }
    let myPieChart = new Chart(pieCanvasRef.current, {
      type: "pie",
      data: {
        labels: ["made", "miss"],
        datasets: [
          {
            borderColor: ["red", "green"],
            hoverBackgroundColor: ["red", "green"],
            data: [missThrows, madeThrows]
          }
        ]
      },
      options: {
        title: { display: true, position: "top", text: "Throws" },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              let throws, made, miss;
              if (fetchedData && players) {
                throws = fetchedData.filter(log => log.log == "throw");
                made = throws.filter(log => log.throw_acc == 1);
                miss = throws.filter(log => log.throw_acc == 0);
              } else {
                return "Loading...";
              }

              if (tooltipItem.index == 0) {
                let counted = countBy(miss, miss => {
                  return miss.player_id;
                });

                console.log(counted);

                let countedStrings = Object.keys(counted).map(key => {
                  let name = players.find(x => x.id == key).name;
                  let surname = players.find(x => x.id == key).surname;
                  return `${name} ${surname}: ${counted[key]}`;
                });

                console.log(countedStrings);
                countedStrings.sort((a, b) => {
                  return b[b.length - 1] - a[a.length - 1];
                });

                return countedStrings;
              } else {
                let counted = countBy(made, made => {
                  return made.player_id;
                });
                console.log({ counted: counted });
                let countedStrings = Object.keys(counted).map(key => {
                  let name = players.find(x => x.id == key).name;
                  let surname = players.find(x => x.id == key).surname;
                  return `${name} ${surname}: ${counted[key]}`;
                });
                countedStrings.sort((a, b) => {
                  return b[b.length - 1] - a[a.length - 1];
                });
                console.log(countedStrings);

                return countedStrings;
              }
            }
          }
        },
        legend: {
          position: "bottom"
        }
      }
    });
  }, [fetchedData]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    let myBarChart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: ["zing", "zong", "zang", "zeng"],

        datasets: [
          {
            label: "Test",
            borderWidth: 2,
            borderColor: ["brown", "red", "blue", "green"],
            hoverBackgroundColor: ["brown", "red", "blue", "green"],
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: testData
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        }
      }
    });

    //  |  This gonna be helpfull click to expand stat
    // \|/ to be more detaild
    canvasRef.current.onclick = function(evt) {
      console.log(myBarChart.getElementAtEvent(evt));
    };

    return () => {
      myBarChart.destroy();
    };
  }, [testData]);

  const fetchMatch = () => {
    setTestData([5, 4, 3, 2]);
  };

  return (
    <>
      <div>
        <canvas ref={canvasRef}></canvas>
        <button onClick={fetchMatch}>DATA</button>
        <canvas ref={pieCanvasRef}></canvas>
      </div>
      <h1>User: {user}</h1>
    </>
  );
}
