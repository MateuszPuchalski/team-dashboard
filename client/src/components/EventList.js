import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";
import useEvents from "../Hooks/useEvents";

const Events = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
`;

export default function EventList({ matchId }) {
  const [loading, events] = useEvents({ matchId: matchId });

  return (
    <Events>
      {events
        ? events.map(event => {
            if (event.type === "Throw") {
              return (
                <div id={`${event.matchId}${event._id}`}>
                  <h3>{event.player.name}</h3>
                  <p>{event.type}</p>
                </div>
              );
            }
            return (
              <div key={event._id} id={`${event.matchId}${event._id}`}>
                {" "}
                {event.type}{" "}
              </div>
            );
          })
        : null}
    </Events>
  );
}
