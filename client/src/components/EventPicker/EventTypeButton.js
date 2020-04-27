import React, { useState, useRef } from "react";
import styled from "styled-components";

import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";

import ClickOutside from "../../_helpers/clickOutside";

const Wrapper = styled.div`
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Event = styled.div`
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
const EventTypeWrapper = styled.div`
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
  console.log(setActive);
  return (
    <Wrapper>
      <EventTypeWrapper
        style={ref == active ? { display: "flex" } : { display: "none" }}
      >
        {event[1]
          ? event[1].map((element, i) => (
              <EventType
                key={i}
                onClick={() => dispatch(eventActions.setEventType(element))}
              >
                {element}
              </EventType>
            ))
          : null}
      </EventTypeWrapper>

      <Event
        ref={ref}
        onClick={() => {
          dispatch(eventActions.setEventType(""));
          dispatch(eventActions.setEvent(event[0]));
          setActive(ref);
        }}
      >
        <h3>{event[0]}</h3>
      </Event>
    </Wrapper>
  );
}
