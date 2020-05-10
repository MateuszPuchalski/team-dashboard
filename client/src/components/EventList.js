import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";
import useMatches from "../Hooks/useMatches";

import EfficiencyCard from "./EfficiencyCard";
import EventCard from "./EventCard";
const textPrimary = "white";
const textSecondary = "#ececec";
const bgPrimary = "#2D1B34";
const bgSecondary = "#1B2E33";
const transitionSpeed = "200ms";

const Events = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  color: white;

  background: ${(props) => props.theme.bg};

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ScoreBoard = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  background: white;
  justify-content: space-between;
  align-content: center;
  padding: 10px 0;
  img {
    margin: 0 1rem;
    height: 3rem;
  }
  span {
    margin: auto;
    font-size: 2rem;
  }
  #vs {
    margin: auto 1rem;
    font-size: 1.5rem;
    opacity: 0.3;
  }
`;

export default function EventList({ matchId, ytVideoRef }) {
  const [loadingEvent, events] = useEvents({ matchId: matchId });
  const [loadingMatch, match] = useMatches(matchId);
  return (
    <Events>
      {match ? (
        <ScoreBoard>
          <img src={match.homeTeam.logo} /> <span>{match.homeScore}</span>{" "}
          <span id="vs">|</span>
          <span>{match.awayScore}</span>
          <img src={match.awayTeam.logo} />
        </ScoreBoard>
      ) : null}
      {!loadingEvent ? (
        events.map((event) => {
          return <EventCard eventData={event} ytVideoRef={ytVideoRef} />;
        })
      ) : (
        <h3>LOADING...</h3>
      )}
    </Events>
  );
}
