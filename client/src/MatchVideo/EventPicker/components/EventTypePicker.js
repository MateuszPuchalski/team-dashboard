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
  ["turnover", ["catch", "dribble", "pass", "charge"]],
  ["throw", ["over", "under", "jump", "7m"]],
  ["punishment", ["2min", "yellow", "red", "blue"]],
  ["half start"],
  ["half end"],
];

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
