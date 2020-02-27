import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import EventList from "../EventList";
import AdminEventForm from "./Forms/AdminEventForm";

import useMatches from "../../Hooks/useMatches";
import useEvents from "../../Hooks/useEvents";

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
  const [eventsLoading, events] = useEvents({ matchId: matchId });
  const [eventLocation, setEventLocation] = useState({ x: 0, y: 0 });
  const [eventEndLocation, setEventEndLocation] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  const ytVideoRef = useRef(null);

  // const setTime = async () => {
  //   const time = await ytVideo.current.internalPlayer.getCurrentTime();
  //   console.log(time);
  //   setCurrTime(Math.round(time * 100) / 100);
  // };

  useEffect(() => {
    console.log(eventEndLocation);
  }, [eventEndLocation]);

  if (match) {
    return (
      <Wrapper>
        <Video>
          <AdminMatchVideo
            events={events}
            ytVideoRef={ytVideoRef}
            ytId={match.ytId}
          />
        </Video>
        <AddEvent>
          <EventList matchId={matchId} />
        </AddEvent>
        <ShowEvent>
          <AdminEventForm
            eventLocation={eventLocation}
            eventEndLocation={eventEndLocation}
            setEventLocation={setEventLocation}
            setEventEndLocation={setEventEndLocation}
            matchId={matchId}
            ytVideoRef={ytVideoRef}
            teams={[
              { _id: match.homeTeam._id, name: match.homeTeam.name },
              { _id: match.awayTeam._id, name: match.awayTeam.name }
            ]}
          />
        </ShowEvent>
      </Wrapper>
    );
  } else {
    return <h3>LOADING...</h3>;
  }
}
