import React, { useEffect, useState } from "react";
import GoalPost from "./goalPost";
export default function AddMatchLog(props) {
  const youtubeControler = props.youtubeControler;

  const [players, setPlayers] = useState([]);
  const [logType, setLogType] = useState("throw");
  const [logData, setLogData] = useState({});
  const [communicationTest, setCommunicationTest] = useState("boom");
  const getAllPlayers = async () => {
    const data = await fetch("/players");
    const items = await data.json();

    setPlayers(items);
  };
  useEffect(() => {
    console.log(communicationTest);
  }, [communicationTest.accurate]);
  function seek() {
    const controler = youtubeControler.internalPlayer;

    controler.getCurrentTime().then(data => {
      console.log(data);
    });

    // youtube.internalPlayer.seekTo(1200);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      player_id: event.target.player.value,
      match_id: props.match,
      log: event.target.log.value,
      timeStamp: Math.floor(
        await youtubeControler.internalPlayer.getCurrentTime()
      )
    };

    console.log(data);
    fetch("/matches/matchLog/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    });
  }
  const logTypeChange = event => {
    setLogType(event.target.value);
  };

  const renderOptions = players => {
    const options = players.map(player => {
      return (
        <option
          value={`${player.id}`}
        >{`${player.name} ${player.surname}`}</option>
      );
    });
    return options;
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="player" id="">
          {players[0] ? renderOptions(players) : <h3>LOADING...</h3>}
        </select>
        <br />
        <select onChange={logTypeChange} type="radio" name="log">
          <option value="throw">Throw</option>
          <option value="2min">2min</option>
          <option value="defCharge">DefCharge</option>
          <option value="offCharge">OffCharge</option>
        </select>
        {/* add type of throw */}
        {logType == "throw" ? (
          <select name="throwType">
            <option value="running">Z biegu</option>
            <option value="jumpShoot">Z wyskoku</option>
            <option value="spin">Wkrętka</option>
            <option value="penalty">Karny</option>
          </select>
        ) : null}
        {logType == "throw" ? <GoalPost test={setCommunicationTest} /> : null}

        <br />

        <input type="submit" value="submit" />
      </form>
      <button onClick={seek}>SEEK</button>
      <h1>{communicationTest.accurate ? "GOAL" : "MISS"}</h1>
    </div>
  );
}
