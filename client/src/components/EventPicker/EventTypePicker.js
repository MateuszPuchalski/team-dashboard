import React, { useState } from "react";
import styled from "styled-components";

import EventTypeButton from "./EventTypeButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const eventTypes = [
  ["Turnover", ["Catch", "Dribble", "Pass"]],
  ["Throw", ["Over", "Under", "Jump"]],
  ["Penalty", ["2min", "Yellow", "Red"]],
];

export default function EventTypePicker() {
  const [active, setActive] = useState(null);
  return (
    <Wrapper>
      {eventTypes.map((element, i) => (
        <EventTypeButton
          active={active}
          setActive={setActive}
          key={i}
          event={element}
        />
      ))}
    </Wrapper>
  );
}
