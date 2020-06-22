import React from "react";
import styled from "styled-components";

import { SELECT_THROW_TECHNIQUE } from "./constants";

const Technique = ["Overarm Shot", "Hip Shot", "Jump Shot"];
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
                ? { background: "black" }
                : null
            }
            onClick={() =>
              dispatch({ type: SELECT_THROW_TECHNIQUE, paylode: item })
            }
          >
            {item}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
