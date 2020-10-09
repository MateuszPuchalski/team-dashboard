import React, { useState, useReducer } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import ThrowForm from "./EventFroms/ThrowForm";
import PassForm from "./EventFroms/PassForm";
import { reducer } from "./EventReducer";
import { SELECT_TYPE } from "./constants";
const Wrapper = styled.div`
  margin: 5px;
`;

const CapsuleWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
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
const EVENT_TYPES = [
  "Foul",
  "Half Start",
  "Half End",
  "Interception",
  "Throw",
  "Turnover",
  "Pass",
  "Bad Behaviour",
];

const ADD_THROW_EVENT = gql`
  mutation AddThrowEvent(
    $matchId: String!
    $player: String!
    $team: String!
    $type: String!
    $location: [Float]!
    $endLocation: [Float]!
    $outcome: String
    $technique: String
    $timestamp: Float!
  ) {
    addThrowEvent(
      matchId: $matchId
      player: $player
      team: $team
      type: $type
      location: $location
      endLocation: $endLocation
      outcome: $outcome
      technique: $technique
      timestamp: $timestamp
    ) {
      id
      type
    }
  }
`;

export default function EventDescription({ parent, ytVideoRef }) {
  const { matchId } = useParams();
  const [addThrowEvent] = useMutation(ADD_THROW_EVENT);

  const [toggle, setToggle] = useState(true);
  const [state, dispatch] = useReducer(reducer, { matchId: matchId });

  return (
    <CapsuleWrapper>
      {EVENT_TYPES.map((item) => {
        return (
          <Capsule
            style={
              toggle === true ? { display: "inline-flex" } : { display: "none" }
            }
            onClick={(e) => {
              setToggle(!toggle);
              dispatch({ type: SELECT_TYPE, paylode: item });
              e.stopPropagation();
            }}
          >
            <div>{item}</div>
          </Capsule>
        );
      })}
      {state.type ? (
        <CapsuleWrapper
          onClick={(e) => {
            setToggle(!toggle);
            e.stopPropagation();
          }}
        >
          {state.type}
          {state.type == "Throw" ? (
            <ThrowForm parent={parent} state={state} dispatch={dispatch} />
          ) : null}
          {state.type == "Pass" ? (
            <PassForm state={state} dispatch={dispatch} />
          ) : null}
        </CapsuleWrapper>
      ) : null}
      <button
        onClick={async () => {
          if (state.throw && state.type == "Throw") {
            addThrowEvent({
              variables: {
                matchId: matchId,
                player: state.player.id,
                team: state.player.currentClub.id,
                type: state.type,
                location: state.location,
                endLocation: state.throw.endLocation,
                outcome: state.throw.outcome,
                technique: state.throw.technique,
                timestamp: await ytVideoRef.current.internalPlayer.getCurrentTime(),
              },
            });
          }
        }}
      >
        ADD
      </button>
    </CapsuleWrapper>
  );
}
