import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usePlayers from "./../../Hooks/usePlayers";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(4, 25vh);
`;

export default function AdminPlayers() {
  const { playerId } = useParams();
  const [loading, player] = usePlayers(playerId);

  return (
    <Wrapper>
      <h1>{player ? player.name : null}</h1>
    </Wrapper>
  );
}
