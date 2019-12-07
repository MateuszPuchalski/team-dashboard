import React, { useEffect, useState } from "react";
import GoalPost from "./goalPost";
import Field from "./field";
export default function AddMatchLog(props) {
  const youtubeControler = props.youtubeControler;

  const [players, setPlayers] = useState([]);
  const [logType, setLogType] = useState("throw");
  const [shotCords, setShotCords] = useState({ shotx: 0, shoty: 0 });
  const [goalDescription, setGoalDescription] = useState({
    accurate: false,
    cords: { goalx: 0, goaly: 0 }
  });

  const getAllPlayers = async () => {
    const data = await fetch("/players");
    const items = await data.json();

    setPlayers(items);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let playerId, matchId, log;
    let logType = "NULL",
      throwAcc = "NULL",
      shotx = "NULL",
      shoty = "NULL",
      goalx = "NULL",
      goaly = "NULL";
    playerId = event.target.player.value;
    matchId = props.match;
    log = event.target.log.value;
    if (log == "throw") {
      logType = event.target.throwType.value;
      throwAcc = goalDescription.accurate;
      shotx = shotCords.shotx;
      shoty = shotCords.shoty;
      goalx = goalDescription.cords.goalx;
      goaly = goalDescription.cords.goaly;
    }

    const data = {
      player_id: playerId,
      match_id: matchId,
      log: log,
      log_type: logType,
      throw_acc: throwAcc,
      shot_x: shotx,
      shot_y: shoty,
      goal_x: goalx,
      goal_y: goaly,
      timestamp: Math.floor(
        await youtubeControler.internalPlayer.getCurrentTime()
      )
    };
    console.log(data);
    for (const key in data) {
      if (data[key] == "NULL") {
        delete data[key];
      }
    }
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
            <option value="overarmShot">Z biegu</option>
            <option value="underarmShot">Biodro</option>
            <option value="jumpShoot">Z wyskoku</option>
            <option value="spinShoot">Wkrętka</option>
            <option value="penalty">Karny</option>
          </select>
        ) : null}
        {logType == "throw" ? <GoalPost goal={setGoalDescription} /> : null}
        {logType == "throw" ? <Field shot={setShotCords} /> : null}
        <br />

        <input type="submit" value="submit" />
      </form>
      <h1>X:{shotCords.x}</h1>
      <h1>Y:{shotCords.y}</h1>
    </div>
  );
}
