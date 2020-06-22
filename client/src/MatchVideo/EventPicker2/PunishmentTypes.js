import React from "react";
import styled from "styled-components";
import { SELECT_PUNISHMENT_TYPE } from "./constants";

const Types = ["2min", "Blue Card", "Red Card", "Yellow Card"];
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
                ? { background: "black" }
                : null
            }
            onClick={() =>
              dispatch({ type: SELECT_PUNISHMENT_TYPE, paylode: item })
            }
          >
            {item}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
