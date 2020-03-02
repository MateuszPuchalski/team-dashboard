import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";

const Events = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  color: black;

  #avatar {
    width: 5rem;
  }
  .event {
    border-radius: 0.5rem;
    display: flex;
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

export default function EventList({ matchId }) {
  const [loading, events] = useEvents({ matchId: matchId });

  return (
    <Events>
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
