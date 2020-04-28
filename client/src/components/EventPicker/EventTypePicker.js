import React, { useState } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
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
const test = ["Turnver", "Throw", "Penalty"];

export default function EventTypePicker() {
  const [active, setActive] = useState(null);

  return (
    <Wrapper>
      {eventTypes.map((item, i) => {
        return (
          <EventTypeButton
            active={active}
            setActive={setActive}
            key={i}
            event={item}
          />
        );
      })}
    </Wrapper>
  );
}
