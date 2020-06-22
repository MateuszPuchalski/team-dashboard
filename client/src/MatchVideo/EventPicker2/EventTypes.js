import React from "react";
import styled from "styled-components";
import { SELECT_TYPE } from "./constants";

const Types = ["Half Start", "Half End", "Throw", "Turnover", "Punishment"];
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const TypeBox = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;
export default function EventTypes({ dispatch, state }) {
  return (
    <Wrapper>
      {Types.map((item) => {
        return (
          <TypeBox
            style={state.type == item ? { background: "black" } : null}
            onClick={() => dispatch({ type: SELECT_TYPE, paylode: item })}
          >
            {item}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
