import React, { useEffect, useState } from "react";

export default function AddMatchLog(props) {
  const youtubeControler = props.youtubeControler;

  const [players, setPlayers] = useState([]);

  const getAllPlayers = async () => {
    const data = await fetch("/players");
    const items = await data.json();
    console.log(items);
    setPlayers(items);
  };

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
        <input type="radio" name="log" value="bramka" />
        bramka
        <br />
        <label htmlFor="">
          Timestamp: <br />
          <input name="timeStamp" />
        </label>
        <input type="submit" value="submit" />
      </form>
      <button onClick={seek}>SEEK</button>
    </div>
  );
}
