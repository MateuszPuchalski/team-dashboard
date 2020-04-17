import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";
import useMatches from "../Hooks/useMatches";

import EfficiencyCard from "./EfficiencyCard";

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
  #avatar {
    height: 4rem;
    width: 4rem;
    margin: 0 1rem;
    flex-grow: 1;
  }

  #playButton {
    filter: invert(0.9);
    height: 2rem;
    flex-grow: 1;
    justify-self: center;
    align-self: center;
  }

  #eventType {
    flex-grow: 2;
    font-size: 1.5rem;
    font-weight: bold;
    justify-self: center;
    align-self: center;
  }

  .event {
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 6rem;
    margin: 1rem 0.5rem;
    background: ${(props) => props.theme.bg};
    #deleteButton {
      height: 1.5rem;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      filter: invert(0.9);
      transition: height ${transitionSpeed};
      &:hover {
        height: 2rem;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const ScoreBoard = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  background: white;
  justify-content: space-between;
  align-content: center;

  margin: 1rem 0;

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

export default function EventList({ matchId }) {
  const [loadingEvent, events] = useEvents({ matchId: matchId });
  const [loadingMatch, match] = useMatches(matchId);
  return (
    <Events>
      <EfficiencyCard />
      {match ? (
        <ScoreBoard>
          <img src={match.homeTeam.logo} /> <span>{match.homeScore}</span>{" "}
          <span id="vs">|</span>
          <span>{match.awayScore}</span>
          <img src={match.awayTeam.logo} />
        </ScoreBoard>
      ) : null}
      {events
        ? events.map((event) => {
            if (event.type === "Throw" || event.type === "Turnover") {
              return (
                <div className="event" id={`${event.matchId}${event._id}`}>
                  {event.player.avatar ? (
                    <img id="avatar" src={event.player.avatar} />
                  ) : (
                    <h3>{event.player.name}</h3>
                  )}
                  <img
                    id="playButton"
                    src={`${process.env.PUBLIC_URL}/playButton.svg`}
                  />
                  <div id="eventType">
                    {event.type}
                    {event.type == "Throw" ? (
                      <p style={{ "font-size": "1rem" }}>
                        {event.throw.outcome}{" "}
                      </p>
                    ) : null}
                  </div>
                  <img
                    onClick={(e) => {
                      fetch(`/api/events/${event._id}/delete`, {
                        method: "DELETE",
                      });
                      e.target.parentNode.style.display = "none";
                    }}
                    id="deleteButton"
                    src={`${process.env.PUBLIC_URL}/trash.svg`}
                  />
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
                <img
                  onClick={(e) => {
                    fetch(`/api/events/${event._id}/delete`, {
                      method: "DELETE",
                    });
                    e.target.parentNode.style.display = "none";
                  }}
                  id="deleteButton"
                  src={`${process.env.PUBLIC_URL}/trash.svg`}
                />
              </div>
            );
          })
        : null}
    </Events>
  );
}
