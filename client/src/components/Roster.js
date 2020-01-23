import React, { useState, useEffect } from "react";

export default function Roster() {
  const [roster, setRoster] = useState();

  const renderRoster = data => {
    const players = data.map(player => {
      return <h3>{player.name}</h3>;
    });
    return players;
  };

  useEffect(() => {
    fetch("/api/players")
      .then(res => res.json())
      .then(data => setRoster(data));
  }, []);

  useEffect(() => {
    console.log(roster);
    if (roster) console.log(roster[0].name);
  }, [roster]);

  return <div>{roster ? renderRoster(roster) : <h3>Loading...</h3>}</div>;
}
