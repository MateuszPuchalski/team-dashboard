import React from "react";

export default function AddMatchLog(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      player_id: event.target.player.value,
      match_id: props.match,
      log: event.target.log.value,
      timeStamp: event.target.timeStamp.value
    };
    fetch("/matches/matchLog/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    });
    console.log(event.target.player.value);
    console.log(event.target.log.value);
    console.log(event.target.timeStamp.value);
  }
  console.log(props);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="player" id="">
          <option value="1">Mateusz Puchalski</option>
          <option value="2">Przemek Kalinowski</option>
          <option value="3">Damian Kowalczuk</option>
          <option value="4">Wojciech Stec</option>
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
    </div>
  );
}
