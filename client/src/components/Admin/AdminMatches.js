import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import EventList from "../EventList";

import AdminEventForm from "./Forms/AdminEventForm";

import useMatches from "../../Hooks/useMatches";
import useEvents from "../../Hooks/useEvents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const Video = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: rgba(255, 255, 255, 0.4);
`;

const AddEvent = styled.div`
  display: none;

  justify-content: center;
  align-items: center;
`;
const ShowEvent = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
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
    console.log({ match: match });
  }, [match]);
  useEffect(() => {
    console.log(eventEndLocation);
  }, [eventEndLocation]);

  if (match) {
    return (
      <>
        <Wrapper>
          <AddEvent></AddEvent>
          <ShowEvent>
            <EventList matchId={matchId} />
          </ShowEvent>
          <Video>
            <AdminMatchVideo
              events={events}
              ytVideoRef={ytVideoRef}
              ytId={match.ytId}
            />
            <AdminEventForm
              eventLocation={eventLocation}
              eventEndLocation={eventEndLocation}
              setEventLocation={setEventLocation}
              setEventEndLocation={setEventEndLocation}
              matchId={matchId}
              ytVideoRef={ytVideoRef}
              teams={[
                {
                  _id: match.homeTeam._id,
                  name: match.homeTeam.name,
                  logo: match.homeTeam.logo
                },
                {
                  _id: match.awayTeam._id,
                  name: match.awayTeam.name,
                  logo: match.awayTeam.logo
                }
              ]}
            />
          </Video>
        </Wrapper>
      </>
    );
  } else {
    return <h3>LOADING...</h3>;
  }
}
