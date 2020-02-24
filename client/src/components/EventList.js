import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GoalChart from "./CourtCharts/GoalsChart";

const Events = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
`;

export default function EventList({ matchId }) {
  const [events, setEvents] = useState();
  const [throwPoints, setThrowPoints] = useState([]);

  const getEvents = async matchId => {
    const data = await fetch(`/api/event/match/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        return data;
      });
    console.log({ data: data });

    const throws = data.reduce((acc, event) => {
      if (event.type === "Throw") {
        acc.push(...event.throw.endLocation);
      }
      return acc;
    }, []);
    console.log(throws);
    setThrowPoints(throws);

    return data;
  };

  useEffect(() => {
    getEvents(matchId);
  }, [matchId]);

  return (
    <Events>
      <GoalChart scale={60} cords={throwPoints} />
      {events
        ? events.map(event => {
            if (event.type === "Throw") {
              return (
                <div id={`${event.matchId}${event._id}`}>
                  <GoalChart scale={30} cords={event.throw.endLocation} />
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
