import React from "react";
import styled from "styled-components";
import { SELECT_PUNISHMENT_TYPE } from "./constants";

const Types = ["2min", "Blue Card", "Red Card", "Yellow Card"];
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
export default function PunishmentTypes({ dispatch, state }) {
  return (
    <Wrapper>
      {Types.map((item) => {
        return (
          <TypeBox
            style={
              state.punishment &&
              state.punishment.type &&
              state.punishment.type == item
                ? { opacity: 1 }
                : { opacity: 0.7 }
            }
            onClick={() =>
              dispatch({ type: SELECT_PUNISHMENT_TYPE, paylode: item })
            }
          >
            <h5>{item}</h5>
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
