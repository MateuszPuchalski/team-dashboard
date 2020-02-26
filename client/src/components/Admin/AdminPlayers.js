import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usePlayers from "./../../Hooks/usePlayers";
import useMatches from "./../../Hooks/useMatches";
import useEvents from "./../../Hooks/useEvents";

import AdminPlayerMatches from "./Players/AdminPlayerMatches";
import GoalsChart from "../CourtCharts/GoalsChart";

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
  const [throwPoints, setThrowPoints] = useState([]);

  useEffect(() => {
    if (events) {
      const throws = events.reduce((acc, event) => {
        if (event.type === "Throw") {
          acc.push(...event.throw.endLocation);
        }
        return acc;
      }, []);
      console.log(throws);
      setThrowPoints(throws);
    }
  }, [events]);

  return (
    <Wrapper>
      <h1>{player ? player.name : null}</h1>
      <GoalsChart scale={100} cords={throwPoints} />
      <AdminPlayerMatches />
    </Wrapper>
  );
}
