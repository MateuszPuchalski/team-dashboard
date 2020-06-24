import React from "react";
import styled from "styled-components";

import { SELECT_THROW_OUTCOME } from "./constants";

const Outcomes = ["Goal", "Miss", "Blocked"];
const Wrapper = styled.div`
  display: flex;
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
export default function ThrowOutcomes({ dispatch, state }) {
  return (
    <Wrapper>
      {Outcomes.map((item) => {
        return (
          <TypeBox
            style={
              state.throw && state.throw.outcome && state.throw.outcome == item
                ? { opacity: 1 }
                : { opacity: 0.7 }
            }
            onClick={() =>
              dispatch({ type: SELECT_THROW_OUTCOME, paylode: item })
            }
          >
            <h5>{item}</h5>
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
