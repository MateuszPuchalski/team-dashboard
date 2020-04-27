import React from "react";
import styled from "styled-components";
import faker from "faker";
import PlayerButton from "./PlayerButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fakePlayers = (x) => {
  const players = [];
  for (let i = 0; i < x; i++) {
    players.push({
      name: faker.name.lastName(),
      nr: faker.random.number(99),
    });
  }
  return players;
};

export default function PlayerPicker(side) {
  return (
    <Wrapper>
      {fakePlayers(10).map((element, i) => {
        return <PlayerButton key={i} name={element.name} nr={element.nr} />;
      })}
    </Wrapper>
  );
}
