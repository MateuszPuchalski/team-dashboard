import React from "react";
import styled from "styled-components";

import { SELECT_TURNOVER_TYPE } from "./constants";

const Types = ["Catch", "Pass", "Dribble"];
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
                ? { background: "black" }
                : null
            }
            onClick={() =>
              dispatch({ type: SELECT_TURNOVER_TYPE, paylode: item })
            }
          >
            {item}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
