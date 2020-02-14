import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminGoalChart from "./Charts/AdminGoalChart";
import AdminEventForm from "./Forms/AdminEventForm";

import useMatches from "../../Hooks/useMatches";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(4, 25vh);
`;
const Video = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 4;
  width: 100%;
  height: 100%;

  background: rgba(255, 255, 255, 0.1);
`;
const AddEvent = styled.div`
  display: flex;
  grid-column: 1 / 5;
  grid-row: 4 / 5;
  justify-content: center;
  align-items: center;
`;
const ShowEvent = styled.div`
  display: flex;
  flex-direction: column;

  grid-column: 5 / 6;
  grid-row: 1 / 6;
`;
export default function AdminMatches() {
  const { matchId } = useParams();
  const [matchLoading, match] = useMatches(matchId);
  const [eventLocation, setEventLocation] = useState({ x: 0, y: 0 });
  const [eventEndLocation, setEventEndLocation] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(() => {
    console.log(eventEndLocation);
  }, [eventEndLocation]);

  if (match) {
    return (
      <Wrapper>
        <Video>
          <AdminMatchVideo ytId={match.ytId} />
        </Video>
        <AddEvent>
          <h1>
            {match.homeTeam.name} {match.homeScore} : {match.awayScore}{" "}
            {match.awayTeam.name}
          </h1>
        </AddEvent>
        <ShowEvent>
          <AdminEventForm
            eventLocation={eventLocation}
            eventEndLocation={eventEndLocation}
            matchId={matchId}
            teams={[
              { _id: match.homeTeam._id, name: match.homeTeam.name },
              { _id: match.awayTeam._id, name: match.awayTeam.name }
            ]}
          />
          <AdminCourtChart
            eventLocation={eventLocation}
            setEventLocation={setEventLocation}
            scale={9}
          />
          <AdminGoalChart
            eventEndLocation={eventEndLocation}
            setEventEndLocation={setEventEndLocation}
            scale={120}
          />
        </ShowEvent>
      </Wrapper>
    );
  } else {
    return <h3>LOADING...</h3>;
  }
}
