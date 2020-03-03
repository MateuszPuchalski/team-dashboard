import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

import usePlayers from "./../../Hooks/usePlayers";
import useMatches from "./../../Hooks/useMatches";
import useEvents from "./../../Hooks/useEvents";

import AdminPlayerMatches from "./Players/AdminPlayerMatches";
import GoalsChart from "../CourtCharts/GoalsChart";
import HalfCourtChart from "../CourtCharts/HalfCourtChart";
import MatchCard from "../MatchCard";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const Matches = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  margin: 1rem;
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
      {player ? (
        <div>
          <h1>{player.name}</h1>

          {player.silhouette ? (
            <img src={player.silhouette} alt="something went wrong" />
          ) : (
            <img
              alt="something went wrong"
              src={`${process.env.PUBLIC_URL}/statues/PlayerPlaceholder.png`}
            />
          )}
        </div>
      ) : null}

      <div>
        <GoalsChart scale={133} cords={throwPoints} />
        <HalfCourtChart scale={20} cords={courtThrowLocation} />
      </div>
      <Matches>
        {matches
          ? matches.map(match =>
              match.ytId ? (
                <StyledLink to={`matches/${match._id}`}>
                  <MatchCard match={match} />
                </StyledLink>
              ) : (
                <MatchCard match={match} />
              )
            )
          : null}
      </Matches>
    </Wrapper>
  );
}
