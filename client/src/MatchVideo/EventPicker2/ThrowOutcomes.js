import React from "react";
import styled from "styled-components";

import { SELECT_THROW_OUTCOME } from "./constants";

const Outcomes = ["Goal", "Miss", "Blocked"];
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
export default function ThrowOutcomes({ dispatch, state }) {
  return (
    <Wrapper>
      {Outcomes.map((item) => {
        return (
          <TypeBox
            style={
              state.throw && state.throw.outcome && state.throw.outcome == item
                ? { background: "black" }
                : null
            }
            onClick={() =>
              dispatch({ type: SELECT_THROW_OUTCOME, paylode: item })
            }
          >
            {item}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
