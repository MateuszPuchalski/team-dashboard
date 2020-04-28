import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { eventAddingActions } from "../../_actions";
import { useDispatch } from "react-redux";

const Wrapper = styled(animated.div)`
  background: ${(props) => props.theme.primary};
  width: 80%;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export default function PlayerButton({ name, nr, active, setActive }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const props = useSpring({
    background:
      ref == active
        ? "linear-gradient(270deg, rgba(0,180,255,1) 0%, rgba(0,120,255,1) 100% "
        : "linear-gradient(270deg,rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 1) 100%)",
  });
  return (
    <Wrapper
      ref={ref}
      style={props}
      onClick={() => {
        setActive(ref);
        dispatch(eventAddingActions.setPlayer(name));
      }}
    >
      <svg width="60" height="60">
        <circle
          cx="30"
          cy="30"
          r="25"
          stroke="black"
          stroke-width="2"
          fill="rgba(0,0,0,.1)"
        />
      </svg>
      <h3>{name}</h3>
      <h3>{nr}</h3>
    </Wrapper>
  );
}
