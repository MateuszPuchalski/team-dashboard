import React from "react";
import styled from "styled-components";

import { SELECT_TURNOVER_TYPE } from "./constants";

const Types = ["Catch", "Pass", "Dribble"];
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 5px;
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
export default function TurnoverTypes({ dispatch, state }) {
  return (
    <Wrapper>
      {Types.map((item) => {
        return (
          <TypeBox
            style={
              state.turnover &&
              state.turnover.type &&
              state.turnover.type == item
                ? { opacity: 1 }
                : { opacity: 0.7 }
            }
            onClick={() =>
              dispatch({ type: SELECT_TURNOVER_TYPE, paylode: item })
            }
          >
            <h4>{item}</h4>
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
