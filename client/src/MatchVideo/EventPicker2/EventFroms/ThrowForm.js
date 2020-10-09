import React from "react";

import styled from "styled-components";
import Checkbox from "../../../components/Checkbox";

import GoalChart from "../Goal";
import CourtChart from "../Court";
import TechniquePicker from "./TechniquePicker";
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

export default function ThrowForm({ state, dispatch, parent }) {
  return (
    <>
      Player: <PlayerPickerForm state={state} dispatch={dispatch} />
      <Capsule
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></Capsule>
      <Capsule
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Blocked: <Checkbox dispatch={dispatch} />
      </Capsule>{" "}
      <TechniquePicker state={state} dispatch={dispatch} />
      {state.throw && state.throw.outcome == "Blocked" ? null : (
        <GoalChart dispatch={dispatch} state={state} parent={parent} />
      )}
      <CourtChart dispatch={dispatch} state={state} parent={parent} />
      {/* <Capsule
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Assist:
        <CapsuleWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Player: <PlayerPickerForm />
        </CapsuleWrapper>
      </Capsule> */}
    </>
  );
}
