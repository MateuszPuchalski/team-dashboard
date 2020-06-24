import React from "react";
import styled from "styled-components";
import { SELECT_TYPE } from "./constants";

const Types = ["Half Start", "Half End", "Throw", "Turnover", "Punishment"];
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin: 5px 5px 15px 5px;
`;
const TypeBox = styled.div`
  flex: 30%;
  color: black;
  background: whitesmoke;
  border-radius: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

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
            style={
              state.type && state.type == item
                ? { opacity: 1 }
                : { opacity: 0.7 }
            }
            onClick={() => dispatch({ type: SELECT_TYPE, paylode: item })}
          >
            <h3>{item}</h3>
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
