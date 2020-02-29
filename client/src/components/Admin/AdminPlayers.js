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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default function AdminPlayers() {
  const { playerId } = useParams();
  const [loadingMatches, matches] = useMatches();
  const [loadingEvents, events] = useEvents({ playerId: playerId });
  const [loadingPlayer, player] = usePlayers(playerId);
  const [throwPoints, setThrowPoints] = useState({});
  const [courtThrowLocation, setCourtThrowLocation] = useState([]);

  useEffect(() => {
    if (events) {
      const accThrows = events.reduce((acc, event) => {
        if (event.type === "Throw" && event.throw.outcome === "Goal") {
          const testObj = {
            ...event.throw.endLocation[0],
            name: event.player.name,
            technique: event.throw.technique,
            outcome: event.throw.outcome
          };
          acc.push(testObj);
        }
        return acc;
      }, []);
      console.log({ accThrows: accThrows });
      const failedThrows = events.reduce((acc, event) => {
        if (event.type === "Throw" && event.throw.outcome !== "Goal") {
          acc.push(...event.throw.endLocation);
        }
        return acc;
      }, []);

      setThrowPoints({ accurate: accThrows, failed: failedThrows });

      const accCourtThrows = events.reduce((acc, event) => {
        if (event.type === "Throw" && event.throw.outcome === "Goal") {
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

      const failedCourtThrows = events.reduce((acc, event) => {
        if (event.type === "Throw" && event.throw.outcome !== "Goal") {
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

      setCourtThrowLocation({
        accurate: accCourtThrows,
        failed: failedCourtThrows
      });
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
