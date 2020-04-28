import React, { useState } from "react";
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
// const fakePlayers = [
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
//   { name: "Mateusz", nr: 27 },
// ];

export default function PlayerPicker({ active, setActive }) {
  return (
    <Wrapper>
      {fakePlayers(16).map((element, i) => {
        return (
          <PlayerButton
            key={i}
            active={active}
            setActive={setActive}
            name={element.name}
            nr={element.nr}
          />
        );
      })}
    </Wrapper>
  );
}
