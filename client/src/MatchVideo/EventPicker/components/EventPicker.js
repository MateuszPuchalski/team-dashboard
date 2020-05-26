import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import PlayerPicker from "./PlayerPicker";
import EventTypePicker from "./EventTypePicker";
import CourtChart from "../../Charts/CourtChart";
import GoalChart from "../../Charts/GoalChart";

import EventConstructionCard from "./EventConstructionCard";

//TODO:
// - Player Picker
// - Event Picker
//  - Pick assist which result in goals or penalty throws
// - Throw from point on the court
// - Ball endpint after throw

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: grid;
  grid-template:
    "home . c c c . away" 1fr
    "home . c c c . away" 1fr
    "home m m m m m away" 1fr
    "home m m m m m away" 1fr
    "home e e e e e away" 1fr;
  background: "linear-gradient(180deg,rgba(254, 95, 100, 0.5) 0%,rgba(250, 25, 154, 0.5) 100%)";
  height: 100vh;
`;
const Home = styled(animated.div)`
  grid-area: home;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }
`;
const Away = styled.div`
  grid-area: away;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }
`;
const EventTypes = styled.div`
  grid-area: e;
`;
const ConstructionCard = styled.div`
  grid-area: c;
`;
const Mid = styled.div`
  display: flex;
  grid-area: m;
`;

export default function EventPicker(props) {
  const eventConstruction = useSelector((state) => state.eventConstruction);
  const match = useSelector((state) => state.matchVideo.match);

  return (
    <Wrapper>
      <ConstructionCard>
        <EventConstructionCard ytVideoRef={props.ytVideoRef} />
      </ConstructionCard>
      <Home>
        {["turnover", "throw", "punishment"].includes(
          eventConstruction.type
        ) && <PlayerPicker clubId={match.homeTeam._id} />}
      </Home>
      <Mid>
        {["turnover", "throw", "punishment"].includes(
          eventConstruction.type
        ) && <CourtChart scale={10} />}

        {eventConstruction.type == "throw" && <GoalChart scale={98} />}
      </Mid>

      <EventTypes>
        <EventTypePicker />
      </EventTypes>
      <Away>
        {["turnover", "throw", "punishment"].includes(
          eventConstruction.type
        ) && <PlayerPicker clubId={match.awayTeam._id} />}
      </Away>
    </Wrapper>
  );
}
