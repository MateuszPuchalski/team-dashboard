import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import usePlayers from "./../../Hooks/usePlayers";
import useMatches from "./../../Hooks/useMatches";
import useEvents from "./../../Hooks/useEvents";

import AdminPlayerMatches from "./Players/AdminPlayerMatches";
import GoalsChart from "../CourtCharts/GoalsChart";
import HalfCourtChart from "../CourtCharts/HalfCourtChart";

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
  const [courtThrowLocation, setCourtThrowLocation] = useState([]);

  useEffect(() => {
    if (events) {
      const throws = events.reduce((acc, event) => {
        if (event.type === "Throw") {
          acc.push(...event.throw.endLocation);
        }
        return acc;
      }, []);
      console.log({ Throws: throws });
      setThrowPoints(throws);

      const courtThrows = events.reduce((acc, event) => {
        if (event.type === "Throw") {
          let x, y;

          if (event.location[0].x < 20) {
            x = 20 - event.location[0].x;
            y = event.location[0].y;
          } else {
            x = event.location[0].x - 20;
            y = 20 - event.location[0].y;
          }
          console.log({ X: x, Y: y });
          acc.push({ x: x, y: y });
        }
        return acc;
      }, []);
      console.log({ courtThrows: courtThrows });
      setCourtThrowLocation(courtThrows);
    }
  }, [events]);

  return (
    <Wrapper>
      <div>
        <h1>{player ? player.name : null}</h1>

        <img
          src={`${process.env.PUBLIC_URL}/statues/PlayerPlaceholder.png`}
          alt="boom"
        />
      </div>
      <div>
        <GoalsChart scale={133} cords={throwPoints} />
        <HalfCourtChart scale={20} cords={courtThrowLocation} />
      </div>

      <AdminPlayerMatches />
    </Wrapper>
  );
}
