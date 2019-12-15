import React from "react";
import { Chart } from "chart.js";
import { useState, useEffect, useRef } from "react";
Chart.defaults.global.defaultFontColor = "White";
export default function Stats(props) {
  const [playerLogs, setPlayerLogs] = useState([]);
  const [throws, setThrows] = useState(0);
  const [turnovers, setTurnovers] = useState(0);
  const [twoMin, setTwoMin] = useState(0);
  const [positiveDefenseActions, setPositiveDefenseActions] = useState(0);
  const [accurateThrows, setAccurateThrows] = useState(0);
  const [jumpShoots, setJumpShoots] = useState(0);
  const [overarmShoots, setOverarmShoots] = useState(0);
  const [underarmShoots, setUnderarmShoots] = useState(0);
  const [panaltys, setPenaltys] = useState(0);
  const getMatchLogsForPlayer = async player => {
    const data = await fetch("/matches/16");
    const items = await data.json();
    console.log(items);
    setPlayerLogs(items);
  };

  const playerStats = logs => {
    const throws = logs.filter(log => log.log == "throw");
    setThrows(throws.length);

    const turnovers = logs.filter(log => log.log == "turnover");
    setTurnovers(turnovers.length);

    const twoMin = logs.filter(log => log.log == "2min");
    setTwoMin(twoMin.length);

    const positiveDefenseActions = logs.filter(
      log => log.log == "attackInterruption" || log.log == "defCharge"
    );
    setPositiveDefenseActions(positiveDefenseActions.length);

    const jumpShoots = throws.filter(shoot => shoot.log_type == "jumpShoot");
    const overarmShoots = throws.filter(
      shoot => shoot.log_type == "overarmShot"
    );
    const underarmShoots = throws.filter(
      shoot => shoot.log_type == "underarmShot"
    );
    const penaltys = throws.filter(shoot => shoot.log_type == "penalty");
    console.log({
      throws: throws,
      jumpShoots: jumpShoots,
      turnovers: turnovers,
      twoMin: twoMin
    });
    setJumpShoots(jumpShoots.length);
    setOverarmShoots(overarmShoots.length);
    setUnderarmShoots(underarmShoots.length);
    setPenaltys(penaltys.length);
  };

  useEffect(() => {
    getMatchLogsForPlayer();
  }, []);

  useEffect(() => {
    if (playerLogs.length < 1) {
      return;
    }
    playerStats(playerLogs);
  }, [playerLogs]);

  useEffect(() => {
    console.log(playerLogs);
  }, [playerLogs]);

  useEffect(() => {
    let ctx = document.getElementById("yourChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",

      data: {
        labels: ["throws", "turnovers", "2min", "defence"],
        datasets: [
          { data: [throws, turnovers, twoMin, positiveDefenseActions] }
        ]
      }
    });
  }, [throws, turnovers, twoMin, positiveDefenseActions]);
  return (
    <>
      <div>
        <canvas id="yourChart"> </canvas>
      </div>
    </>
  );
}
