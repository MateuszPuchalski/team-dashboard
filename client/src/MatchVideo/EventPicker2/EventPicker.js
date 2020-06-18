import React, { useReducer, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import Players from "./Players";
import EventTypes from "./EventTypes";
import TurnoverTypes from "./TurnoverTypes";
import ThrowTechniques from "./ThrowTechniques";
import ThrowOutcomes from "./ThrowOutcomes";
import PunishmentTypes from "./PunishmentTypes";

import {
  SELECT_TYPE,
  SELECT_THROW_OUTCOME,
  SELECT_THROW_TECHNIQUE,
  SELECT_TURNOVER_TYPE,
  SELECT_PUNISHMENT_TYPE,
  SELECT_PLAYER,
} from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_TYPE:
      return { ...state, type: action.paylode };
      break;
    case SELECT_PLAYER:
      return { ...state, player: action.paylode };
      break;
    case SELECT_THROW_OUTCOME:
      return { ...state, throw: { ...state.throw, outcome: action.paylode } };
      break;
    case SELECT_THROW_TECHNIQUE:
      return { ...state, throw: { ...state.throw, technique: action.paylode } };
      break;
    case SELECT_TURNOVER_TYPE:
      return { ...state, turnover: { type: action.paylode } };
      break;
    case SELECT_PUNISHMENT_TYPE:
      return { ...state, punishment: { type: action.paylode } };
      break;
    default:
      break;
  }
};

const GET_MATCH = gql`
  query($matchId: String!) {
    matchById(matchId: $matchId) {
      id
      homeTeam {
        name
        players {
          id
          name
          currentClub {
            id
            name
          }
        }
      }
      awayTeam {
        name
        players {
          id
          name
          currentClub {
            id
            name
          }
        }
      }
    }
  }
`;

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
export default function EventPicker() {
  const { matchId } = useParams();
  const [state, dispatch] = useReducer(reducer, { matchId: matchId });
  const [addThrowEvent] = useMutation(ADD_THROW_EVENT);
  const { loading, error, data } = useQuery(GET_MATCH, {
    variables: { matchId: matchId },
  });

  useEffect(() => {
    console.log({ Matchdata: data });
  }, [data]);

  return (
    <div>
      <EventTypes dispatch={dispatch} />
      {state.type == "Throw" && <ThrowOutcomes dispatch={dispatch} />}
      {state.type == "Throw" && <ThrowTechniques dispatch={dispatch} />}
      {state.type == "Punishment" && <PunishmentTypes dispatch={dispatch} />}
      {state.type == "Turnover" && <TurnoverTypes dispatch={dispatch} />}
      {!loading && (
        <>
          <Players
            players={data.matchById.homeTeam.players}
            dispatch={dispatch}
          />
          <Players
            players={data.matchById.awayTeam.players}
            dispatch={dispatch}
          />
        </>
      )}
      <button
        onClick={() =>
          addThrowEvent({
            variables: {
              matchId: matchId,
              player: state.player.id,
              team: state.player.currentClub.id,
              type: state.type,
              location: [1, 1],
              endLocation: [1, 1],
              outcome: state.throw.outcome,
              technique: state.throw.technique,
              timestamp: 111,
            },
          })
        }
      >
        Add Throw
      </button>
    </div>
  );
}
