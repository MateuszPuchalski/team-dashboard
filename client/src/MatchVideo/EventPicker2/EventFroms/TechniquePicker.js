import React, { useState } from "react";
import styled from "styled-components";
import { SELECT_THROW_TECHNIQUE } from "../constants";

const CapsuleWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;

  margin: 3px;
  padding: 5px 8px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);

  img {
    margin: 5px 5px;
    height: 25px;
  }
`;

const Capsule = styled.div`
  display: inline-flex;
  margin: 3px;
  padding: 5px 8px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);

  img {
    margin: 5px 5px;
    height: 25px;
  }
`;

const TECHNIQUE_TYPES = [
  "Jump Shot",
  "Hip Shot",
  "Overarm Shot",
  "Spin Shot",
  "Lob",
];

export default function TechniquePicker({ state, dispatch }) {
  const [toggleTechnique, setToggleTechnique] = useState(true);
  return (
    <CapsuleWrapper>
      Technique:
      {state.throw && state.throw.technique ? (
        <Capsule
          onClick={(e) => {
            setToggleTechnique(!toggleTechnique);
            e.stopPropagation();
          }}
        >
          {state.throw.technique}
        </Capsule>
      ) : null}
      {toggleTechnique
        ? TECHNIQUE_TYPES.map((item) => {
            return (
              <Capsule
                onClick={(e) => {
                  dispatch({ type: SELECT_THROW_TECHNIQUE, paylode: item });

                  setToggleTechnique(!toggleTechnique);

                  e.stopPropagation();
                }}
              >
                <div>{item}</div>
              </Capsule>
            );
          })
        : null}
    </CapsuleWrapper>
  );
}
