import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-row: 11 / 12;
  grid-column: 4 / 13;
  position: absolute;
  display: flex;
  justify-content: space-between;
  /* box-shadow: 5px 5px 200px; */
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;

  width: 15vw;
  height: 20vh;

  margin: 10px;
  z-index: 10;
  border-radius: 10px;

  background: #dd1818; /* fallback for old browsers */
`;

const Header = styled.h3`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
  align-self: center;
  justify-content: center;
  margin-bottom: 0;
`;

const Stat = styled.h3`
  color: white;
  flex-grow: 3;
  align-self: center;
  justify-content: center;
`;

export default function StatPanel() {
  return (
    <Wrapper>
      <Card>
        <Header>POINTS PER GAME</Header>
        <div>
          <hr />
        </div>
        <Stat>12.3</Stat>
      </Card>
      <Card>
        <Header>POINTS PER GAME</Header>
        <div>
          <hr />
        </div>
        <Stat>11.3</Stat>
      </Card>
      <Card>
        <Header>POINTS PER GAME</Header>
        <div>
          <hr />
        </div>
        <Stat>10.3</Stat>
      </Card>
    </Wrapper>
  );
}
