import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSpring, useTransition, animated, interpolate } from "react-spring";

import { setEvent, setEventDescription } from "../eventConstructionDuck";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Event = styled(animated.div)`
  background: ${(props) => props.theme.primary};
  width: 120px;
  height: 120px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  &:hover {
    cursor: pointer;
  }
`;
const EventTypeWrapper = styled(animated.div)`
  position: absolute;
  top: -30px;
  display: flex;
  flex-direction: row;
`;
const EventType = styled.div`
  background: ${(props) => props.theme.primary};
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  &:hover {
    cursor: pointer;
  }
`;

export default function EventTypeButton({ event, active, setActive }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const props = useSpring({
    background:
      ref == active
        ? "linear-gradient(270deg, rgba(0,180,255,1) 0%, rgba(0,120,255,1) 100% "
        : "linear-gradient(270deg,rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 1) 100%)",
  });
  //"linear-gradient(180deg,rgba(254, 95, 100, 1) 0%,rgba(250, 25, 154, 1) 100%)",
  const eventTypePopups = useTransition(ref == active, null, {
    from: { transform: "scale(0)", opacity: 0 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0)", opacity: 0 },
  });

  return (
    <Wrapper>
      {eventTypePopups.map(({ item, props, key }) => {
        return item ? (
          // <animated.div key={key} style={props}>
          <EventTypeWrapper key={key} style={props}>
            {event[1]
              ? event[1].map((element, i) => (
                  <EventType
                    key={i}
                    onClick={() => dispatch(setEventDescription(element))}
                  >
                    {element}
                  </EventType>
                ))
              : null}
          </EventTypeWrapper>
        ) : // </animated.div>
        null;
      })}

      <Event
        style={props}
        ref={ref}
        onClick={() => {
          console.log({ event0: event[0] });
          dispatch(setEvent(event[0]));
          setActive(ref);
        }}
      >
        <h3>{event[0]}</h3>
      </Event>
    </Wrapper>
  );
}
