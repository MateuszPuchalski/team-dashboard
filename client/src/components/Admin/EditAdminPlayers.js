import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usePlayers from "./../../Hooks/usePlayers";

const Editor = styled.div`
  color: black;

  #silhouette {
    height: 20rem;
  }

  #clubLogo {
    height: 20rem;
  }
`;

export default function EditAdminPlayers() {
  const { playerId } = useParams();
  const [playerLoading, player] = usePlayers(playerId);
  useEffect(() => {
    console.log(player);
  }, [player]);
  return (
    <Editor>
      {player ? (
        <>
          <span id="name">{player.name}</span>
          <img src={player.silhouette} id="silhouette" />
          <img src={player.avatar} id="avatar" />

          <span id="jerseyNumber">{player.jerseyNumber}</span>
          <div id="metrics">
            <span id="date">{player.date}</span>
            <span id="weight">{player.weight}</span>
            <span id="height">{player.height}</span>
            <span id="position">{player.position}</span>
          </div>

          <img src={player.currentClub.logo} id="clubLogo" />
        </>
      ) : null}
    </Editor>
  );
}
