import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";
import useMatches from "../Hooks/useMatches";

const Events = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  color: black;

  #avatar {
    height: 5rem;
  }
  .event {
    border-radius: 0.5rem;
    display: flex;
    height: 6rem;
    margin: 1rem 0.5rem;
    box-shadow: -12px -12px 12px 0 rgba(255, 255, 255, 1),
      12px 12px 12px 0 rgba(0, 0, 0, 0.1);
    transition: 333ms box-shadow;

    &:hover {
      box-shadow: 0px 0px 0px 0 rgba(255, 255, 255, 1),
        0px 0px 0px 0 rgba(0, 0, 0, 0.1),
        inset 12px 12px 12px 0 rgba(0, 0, 0, 0.1),
        inset -12px -12px 12px 0 rgba(255, 255, 255, 1);
    }
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  height: 10rem;
  width: 80%;

  img {
    height: 4rem;
  }
  span {
    font-size: 2rem;
  }
`;

export default function EventList({ matchId }) {
  const [loadingEvent, events] = useEvents({ matchId: matchId });
  const [loadingMatch, match] = useMatches(matchId);
  return (
    <Events>
      {match ? (
        <ScoreBoard>
          <img src={match.homeTeam.logo} /> <span>{match.homeScore}</span>{" "}
          <span>|</span>
          <span>{match.awayScore}</span>
          <img src={match.awayTeam.logo} />
        </ScoreBoard>
      ) : null}
      {events
        ? events.map(event => {
            if (event.type === "Throw") {
              return (
                <div className="event" id={`${event.matchId}${event._id}`}>
                  {event.player.avatar ? (
                    <img id="avatar" src={event.player.avatar} />
                  ) : (
                    <h3>{event.player.name}</h3>
                  )}

                  <p>{event.type}</p>
                </div>
              );
            }
            return (
              <div
                className="event"
                key={event._id}
                id={`${event.matchId}${event._id}`}
              >
                {" "}
                {event.type}{" "}
              </div>
            );
          })
        : null}
    </Events>
  );
}
