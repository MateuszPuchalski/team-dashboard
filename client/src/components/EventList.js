import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";

const Events = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;

  #avatar {
    width: 5rem;
  }
  .event {
    display: flex;
    margin: 1rem 0.5rem;
    &:hover {
      background: green;
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
