import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usePlayers from "./../../Hooks/usePlayers";
import useMatches from "./../../Hooks/useMatches";
import useEvents from "./../../Hooks/useEvents";

import AdminPlayerMatches from "./Players/AdminPlayerMatches";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(4, 25vh);
`;

export default function AdminPlayers() {
  const { playerId } = useParams();
  const [loadingMatches, matches] = useMatches();
  const [loadingEvents, events] = useEvents({ playerId: playerId });
  const [loadingPlayer, player] = usePlayers(playerId);

  useEffect(() => {
    console.log({ Events: events });
  }, [matches]);

  return (
    <Wrapper>
      <h1>{player ? player.name : null}</h1>
      <AdminPlayerMatches />
    </Wrapper>
  );
}
