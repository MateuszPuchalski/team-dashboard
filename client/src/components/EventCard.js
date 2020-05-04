import React from "react";
import styled from "styled-components";

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
function fancyTimeFormat(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
export default function EventCard({ eventData, ytVideoRef }) {
  return (
    <Event
      onClick={() => {
        console.log("BOOM");
        ytVideoRef.current.internalPlayer.seekTo(eventData.timestamp, true);
        ytVideoRef.current.internalPlayer.playVideo();
      }}
    >
      <TimelineLine />

      <Timestamp>{fancyTimeFormat(eventData.timestamp)}</Timestamp>
      <EventIcon>
        <img src={process.env.PUBLIC_URL + "/ball.png"} />
      </EventIcon>
      {eventData.player ? (
        <EventDescription>
          <h4>{eventData.player.name}</h4>
          <h6 className="type">{eventData.type}</h6>
        </EventDescription>
      ) : (
        <EventDescription>
          <h4>Place</h4>
          <h6 className="type">Holder</h6>
        </EventDescription>
      )}
    </Event>
  );
}
