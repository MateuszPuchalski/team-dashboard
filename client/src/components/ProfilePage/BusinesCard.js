import React from "react";
import styled from "styled-components";

const borderRadius = "5px";

const Wrapper = styled.div`
  display: flex;
  background: red;
  flex-direction: column;
  justify-content: space-evenly;
  color: whitesmoke;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  padding: 2rem;
  margin: 1rem;
  /* align-items: center; */
  border-radius: ${borderRadius};

  h2 {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
`;

export default function BusinesCard() {
  return (
    <Wrapper>
      <h2>Mateusz Puchalski</h2>
      <h4>Środkowy Rozgrywający</h4>
    </Wrapper>
  );
}
