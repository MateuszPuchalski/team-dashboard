import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Stats(props) {
  const [playerLogs, setPlayerLogs] = useState([]);
  const [throws, setThrows] = useState(0);
  const [accurateThrows, setAccurateThrows] = useState(0);
  const getMatchLogsForPlayer = async player => {
    const data = await fetch("/matches/matchLog/16/1");
    const items = await data.json();

    setPlayerLogs(items);
  };

  const playerStats = logs => {
    const madeThrows = logs.filter(
      log => log.log == "throw" && log.player_id == 1
    );
    const accurateThrows = madeThrows.filter(throww => throww.throw_acc == 1);
    setThrows(madeThrows.length);
    setAccurateThrows(accurateThrows.length);
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
  return (
    <div>
      <h1>HELLO!</h1>
      <h1>Throws: {throws}</h1>
      <h1>Accurate Throws: {accurateThrows}</h1>
      <h1>Efficency: {(accurateThrows / throws).toFixed(2)}</h1>
    </div>
  );
}
