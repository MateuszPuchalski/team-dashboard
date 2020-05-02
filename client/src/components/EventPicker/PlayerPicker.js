import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import faker from "faker";
import PlayerButton from "./PlayerButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function PlayerPicker({ side, active, setActive }) {
  const players = useSelector((state) => {
    if (side == "home") {
      return state.eventShape.homePlayers;
    }
    if (side == "away") {
      return state.eventShape.awayPlayers;
    }
  });
  return (
    <Wrapper>
      {players
        ? players.map((element, i) => {
            return (
              <PlayerButton
                playerInfo={element}
                avatar={element.avatar}
                key={i}
                active={active}
                setActive={setActive}
                name={element.name}
                nr={element.jerseyNumber}
              />
            );
          })
        : "Loading"}
    </Wrapper>
  );
}
