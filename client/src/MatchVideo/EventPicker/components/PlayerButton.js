import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { eventAddingActions } from "../../../_actions";
import { setPlayer } from "../eventConstructionDuck";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled(animated.div)`
  background: ${(props) => props.theme.primary};
  width: 100%;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  img {
    height: 55px;
  }
`;

export default function PlayerButton({ playerInfo, id }) {
  const dispatch = useDispatch();

  const selectedPlayerId = useSelector(
    (state) => state.eventConstruction && state.eventConstruction.player
  );
  const props = useSpring({
    background:
      id == selectedPlayerId
        ? "linear-gradient(270deg, rgba(0,180,255,1) 0%, rgba(0,120,255,1) 100% "
        : "linear-gradient(270deg,rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 1) 100%)",
  });
  return (
    <Wrapper
      style={props}
      onClick={() => {
        dispatch(setPlayer(playerInfo._id));
      }}
    >
      {playerInfo.avatar ? (
        <img src={playerInfo.avatar} />
      ) : (
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
      )}

      <h3>{playerInfo.name}</h3>
      <h3>{playerInfo.jerseyNumber}</h3>
    </Wrapper>
  );
}
