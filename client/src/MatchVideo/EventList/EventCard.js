import React from "react";
import styled from "styled-components";
import fancyTimeFormat from "../../_helpers/fancyTimeFormat";
const Event = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  &:hover {
    color: black;
    background: whitesmoke;
    cursor: pointer;
  }
`;
const Timestamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;
const EventIcon = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  img {
    height: 35px;
  }
`;

const EventDescription = styled.div`
  width: 60%;
  .type {
    font-weight: lighter;
  }
`;
// #4d9f0c
// #9198e5
// #4d9f0c
const TimelineLine = styled.div`
  position: absolute;
  width: 25%;
  height: 50%;
  top: 75%;

  border-right: 3px solid white;
`;
const wichIcon = (data) => {
  switch (data.type) {
    case "Half Start":
      return <img src={process.env.PUBLIC_URL + "/whistle.svg"} />;
      break;
    case "Half End":
      return <img src={process.env.PUBLIC_URL + "/whistle.svg"} />;
      break;
    case "Throw":
      switch (data.throw.outcome) {
        case "Saved":
          return <img src={process.env.PUBLIC_URL + "/goalpostsquare.svg"} />;
          break;

        default:
          return <img src={process.env.PUBLIC_URL + "/ball.svg"} />;
          break;
      }

    case "Bad Behaviour":
      switch (data.badBehaviour) {
        case "Yellow Card":
          return <img src={process.env.PUBLIC_URL + "/yellow-card1.svg"} />;
          break;
        case "Red Card":
          return <img src={process.env.PUBLIC_URL + "/red-card.svg"} />;
          break;
        case "Blue Card":
          return <img src={process.env.PUBLIC_URL + "/blue-card.svg"} />;
          break;
        case "2min":
          return <img src={process.env.PUBLIC_URL + "/2min.svg"} />;
          break;

        default:
          break;
      }
      break;
    case "Turnover":
      switch (data.turnover) {
        case "Pass":
          return "Pass";
          break;
        case "Catch":
          return "Catch";
          break;
        case "Dribble":
          return "Dribble";
          break;

        default:
          break;
      }
      break;
    default:
      break;
  }
};
export default function EventCard({ eventData, ytVideoRef }) {
  return (
    <Event
      onClick={() => {
        ytVideoRef.current.internalPlayer.seekTo(eventData.timestamp, true);
        ytVideoRef.current.internalPlayer.playVideo();
      }}
    >
      <TimelineLine />

      <Timestamp>{fancyTimeFormat(eventData.timestamp)}</Timestamp>
      <EventIcon>{wichIcon(eventData)}</EventIcon>
      {eventData.player ? (
        <EventDescription>
          <h4>{eventData.player.name}</h4>
          <h6 className="type">{eventData.type}</h6>
        </EventDescription>
      ) : (
        <EventDescription>
          <h4>{eventData.type}</h4>
          <h6 className="type">Holder</h6>
        </EventDescription>
      )}
    </Event>
  );
}
