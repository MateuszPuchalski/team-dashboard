import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import "../main.css";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [id, setId] = useState(1);
  const [players, setPlayers] = useState([]);
  const getAllPlayers = async () => {
    const data = await fetch("/players");
    const items = await data.json();
    console.log(items);
    setPlayers(items);
  };

  const renderAvatar = players => {
    const linkedPlayers = players.map(player => {
      return (
        <Link to={`/players/${player.id}`}>
          <Avatar id={player.id} />
        </Link>
      );
    });

    return linkedPlayers;
  };

  useEffect(() => {
    getAllPlayers();
    console.log(players);
  }, []);

  return (
    <div className="sidebar">
      <img src={process.env.PUBLIC_URL + `/herb.webp`} id="herb" alt="herb" />
      <div className="avatars">
        {players[0] ? renderAvatar(players) : <h3>LOADING...</h3>}
      </div>

      <img src={process.env.PUBLIC_URL + `/arrow.png`} id="arrow" alt="arrow" />
    </div>
  );
}
