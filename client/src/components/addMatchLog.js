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
      assistId = "NULL",
      actionType = "NULL",
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
      assistId = event.target.assist.value;
      actionType = event.target.actionType.value;
      throwAcc = goalDescription.accurate;
      shotx = shotCords.shotx;
      shoty = shotCords.shoty;
      goalx = goalDescription.cords.goalx;
      goaly = goalDescription.cords.goaly;
    }
    if (log == "turnover") {
      logType = event.target.turnoverType.value;
    }
    if (log == "blockedShoot") {
      shotx = shotCords.shotx;
      shoty = shotCords.shoty;
    }

    const data = {
      player_id: playerId,
      assist_id: assistId,
      match_id: matchId,
      log: log,
      log_type: logType,
      action_type: actionType,
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
        <select name="player">
          {players[0] ? renderOptions(players) : <h3>LOADING...</h3>}
        </select>
        <br />
        <select onChange={logTypeChange} name="log">
          <option value="throw">Rzut</option>
          <option value="turnover">Strata</option>
          <option value="blockedShoot">Rzut w blok</option>
          <option value="defenceBlock">Zblokowany rzut</option>
          <option value="2min">2min</option>
          <option value="steal">Wygarnięcie piłki</option>
          <option value="attackInterruption">Przechwyt</option>
          <option value="defCharge">DefCharge</option>
          <option value="offCharge">OffCharge</option>
          <option value="yellowCard">Żółta kartka</option>
          <option value="redCard">Czerwona kartka</option>
        </select>
        {/* add type of throw */}
        {logType == "turnover" ? (
          <select name="turnoverType">
            <option value="catchError">Błąd chwytu</option>
            <option value="passError">Błąd podania</option>
            <option value="doubleDribble">Bład kozłowania</option>
            <option value="travel">Bład kroków</option>
          </select>
        ) : null}
        {logType == "throw" ? (
          <>
            <select name="actionType">
              <option value="standard">Standard</option>
              <option value="fastBreak">Kontra</option>
              <option value="fastThrowOff">Szybki środek</option>
              <option value="breakthrough">1on1</option>
            </select>
            <select name="throwType">
              <option value="jumpShoot">Z wyskoku</option>
              <option value="overarmShot">Z biegu</option>
              <option value="underarmShot">Biodro</option>

              <option value="spinShoot">Wkrętka</option>
              <option value="penalty">Karny</option>
            </select>
            <h3>Assist: </h3>
            <select name="assist">
              <option value="NULL">NULL</option>
              {players[0] ? renderOptions(players) : <h3>LOADING...</h3>}
            </select>
          </>
        ) : null}
        {logType == "throw" ? <GoalPost goal={setGoalDescription} /> : null}
        {logType == "throw" || logType == "blockedShoot" ? (
          <Field shot={setShotCords} />
        ) : null}
        <br />

        <input type="submit" value="submit" />
      </form>
      <h1>X:{shotCords.x}</h1>
      <h1>Y:{shotCords.y}</h1>
    </div>
  );
}
