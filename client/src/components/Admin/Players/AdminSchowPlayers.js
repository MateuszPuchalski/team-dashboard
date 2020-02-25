import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import usePlayers from "../../../Hooks/usePlayers";

export default function AdminSchowPlayers() {
  const [loading, players] = usePlayers();
  console.log({ Players: players });
  return (
    <div>
      <ul>
        {players
          ? players.map(player => (
              <Link to={`/admin/players/${player._id}`}>
                <li>{player.name}</li>
              </Link>
            ))
          : null}
      </ul>
    </div>
  );
}
