import React from "react";
import styled from "styled-components";

import { SELECT_THROW_TECHNIQUE } from "./constants";

const Technique = ["Overarm Shot", "Hip Shot", "Jump Shot"];
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
export default function ThrowTechnique({ dispatch, state }) {
  return (
    <Wrapper>
      {Technique.map((item) => {
        return (
          <TypeBox
            style={
              state.throw &&
              state.throw.technique &&
              state.throw.technique == item
                ? { opacity: 1 }
                : { opacity: 0.7 }
            }
            onClick={() =>
              dispatch({ type: SELECT_THROW_TECHNIQUE, paylode: item })
            }
          >
            <h5>{item}</h5>
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
