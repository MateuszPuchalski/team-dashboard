import React from "react";
import styled from "styled-components";

const borderRadius = "5px";

const Wrapper = styled.div`
  display: flex;
  background: red;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.theme.primary};
  /* background: linear-gradient(to right, #0f2027, #203a43, #2c5364); */
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
  img {
    padding-bottom: 1rem;
  }
`;

export default function BusinesCard() {
  return (
    <Wrapper>
      <img src={process.env.PUBLIC_URL + "/avatars/MateuszPuchalski.png"} />
      <h2>Mateusz Puchalski</h2>
      <h4>Środkowy Rozgrywający</h4>
    </Wrapper>
  );
}
