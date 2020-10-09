import React from "react";
import styled from "styled-components";

import PlayerPickerForm from "./PlayerPickerForm";

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

export default function PassForm({ state, dispatch }) {
  return (
    <CapsuleWrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Capsule
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Player: <PlayerPickerForm state={state} dispatch={dispatch} />
      </Capsule>
      <Capsule
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Recipient: <PlayerPickerForm state={state} dispatch={dispatch} />
      </Capsule>
    </CapsuleWrapper>
  );
}
