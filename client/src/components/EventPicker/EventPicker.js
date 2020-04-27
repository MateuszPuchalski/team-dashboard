import React from "react";
import styled from "styled-components";

import PlayerPicker from "./PlayerPicker";
import EventTypePicker from "./EventTypePicker";
import EventConstructionCard from "./EventConstructionCard";
//TODO:
// - Player Picker
// - Event Picker
//  - Pick assist which result in goals or penalty throws
// - Throw from point on the court
// - Ball endpint after throw
const Wrapper = styled.div`
  display: grid;
  grid-template:
    "home . c c c . away" 1fr
    "home . . . . . away" 1fr
    "home . . . . . away" 1fr
    "home . . . . . away" 1fr
    "home e e e e e away" 1fr;
  background: ${(props) => props.theme.bg};
  height: 100vh;
`;

const Home = styled.div`
  grid-area: home;
  overflow: scroll;
`;

const Away = styled.div`
  grid-area: away;
  overflow: scroll;
`;

const EventTypes = styled.div`
  grid-area: e;
`;
const ConstructionCard = styled.div`
  grid-area: c;
`;
export default function EventPicker() {
  return (
    <Wrapper>
      <ConstructionCard>
        <EventConstructionCard />
      </ConstructionCard>
      <Home>
        <PlayerPicker />
      </Home>
      <EventTypes>
        <EventTypePicker />
      </EventTypes>
      <Away>
        <PlayerPicker />
      </Away>
    </Wrapper>
  );
}
