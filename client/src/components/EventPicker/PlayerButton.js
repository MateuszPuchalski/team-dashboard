import React, { useState } from "react";
import styled from "styled-components";

import { eventActions } from "../../_actions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  background: ${(props) => props.theme.primary};
  width: 120px;
  height: 120px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function PlayerButton({ name, nr }) {
  const dispatch = useDispatch();
  return (
    <Wrapper onClick={() => dispatch(eventActions.setPlayer(name))}>
      <h3>{name}</h3>
      <h3>{nr}</h3>
    </Wrapper>
  );
}
