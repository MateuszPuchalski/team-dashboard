import React from "react";

export default function AddMatchLog(props) {
  const youtubeControler = props.youtubeControler;
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="player" id="">
          <option value="1">Mateusz Puchalski</option>
          <option value="2">Przemek Kalinowski</option>
          <option value="3">Damian Kowalczuk</option>
          <option value="4">Wojciech Stec</option>
          <option value="7">Szymon Jadczak</option>
          <option value="8">Łukasz Płoński</option>
          <option value="16">Adam Gawza</option>
          <option value="17">Szymon Jabłoński</option>
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
