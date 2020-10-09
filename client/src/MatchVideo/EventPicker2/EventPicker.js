import React, { useReducer } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import useClientRect from "../../Hooks/useClientRect";

import Players from "./Players";
import EventTypes from "./EventTypes";
import GoalChart from "./Goal";
import CourtChart from "./Court";
import TurnoverTypes from "./TurnoverTypes";
import ThrowTechniques from "./ThrowTechniques";
import ThrowOutcomes from "./ThrowOutcomes";
import PunishmentTypes from "./PunishmentTypes";
import TextMovingButton from "../../components/TextMovingButton";
import Checkbox from "../../components/Checkbox";

import EventDescription from "./EventDescription";

import { reducer } from "./EventReducer";

const GET_MATCH = gql`
  query($matchId: String!) {
    matchById(matchId: $matchId) {
      id
      homeTeam {
        name
        players {
          id
          name
          avatar
          jerseyNumber
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
          avatar
          jerseyNumber
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

const ADD_TURNOVER_EVENT = gql`
  mutation AddTurnoverEvent(
    $matchId: String!
    $player: String!
    $team: String!
    $type: String!
    $location: [Float]!
    $turnoverType: String!
    $timestamp: Float!
  ) {
    addTurnoverEvent(
      matchId: $matchId
      player: $player
      team: $team
      type: $type
      location: $location
      turnoverType: $turnoverType
      timestamp: $timestamp
    ) {
      id
      type
    }
  }
`;

const ADD_PUNISHMENT_EVENT = gql`
  mutation AddPunishmentEvent(
    $matchId: String!
    $player: String!
    $team: String!
    $type: String!
    $location: [Float]!
    $punishmentType: String!
    $timestamp: Float!
  ) {
    addPunishmentEvent(
      matchId: $matchId
      player: $player
      team: $team
      type: $type
      location: $location
      punishmentType: $punishmentType
      timestamp: $timestamp
    ) {
      id
      type
    }
  }
`;
const ADD_SOME_EVENT = gql`
  mutation AddSomeEvent($matchId: String!, $type: String!, $timestamp: Float!) {
    addSomeEvent(matchId: $matchId, type: $type, timestamp: $timestamp) {
      type
    }
  }
`;

export default function EventPicker({ ytVideoRef }) {
  const { matchId } = useParams();
  const [rect, ref] = useClientRect();
  const [addThrowEvent] = useMutation(ADD_THROW_EVENT);
  const [addTurnoverEvent] = useMutation(ADD_TURNOVER_EVENT);
  const [addPunishmentEvent] = useMutation(ADD_PUNISHMENT_EVENT);
  const [addSomeEvent] = useMutation(ADD_SOME_EVENT);

  const [state, dispatch] = useReducer(reducer, { matchId: matchId });

  const { loading, error, data } = useQuery(GET_MATCH, {
    variables: { matchId: matchId },
  });

  return (
    <div ref={ref}>
      <EventDescription parent={rect} state={state} dispatch={dispatch} />
      <div>{JSON.stringify(state)}</div>

      <Checkbox />
      <EventTypes dispatch={dispatch} state={state} />
      {state.type == "Throw" && (
        <>
          <ThrowOutcomes state={state} dispatch={dispatch} />
          <ThrowTechniques state={state} dispatch={dispatch} />
          <GoalChart state={state} parent={rect} dispatch={dispatch} />
        </>
      )}

      {state.type == "Punishment" && (
        <PunishmentTypes state={state} dispatch={dispatch} />
      )}
      {state.type == "Turnover" && (
        <TurnoverTypes state={state} dispatch={dispatch} />
      )}
      {(state.type == "Throw" ||
        state.type == "Punishment" ||
        state.type == "Turnover") && (
        <CourtChart state={state} parent={rect} dispatch={dispatch} />
      )}
      {!loading &&
        (state.type == "Throw" ||
          state.type == "Punishment" ||
          state.type == "Turnover") && (
          <>
            <Players
              state={state}
              players={data.matchById.homeTeam.players}
              dispatch={dispatch}
            />
            <Players
              state={state}
              players={data.matchById.awayTeam.players}
              dispatch={dispatch}
            />
          </>
        )}
      <button
        onClick={async () => {
          if (state.type == "Half Start" || state.type == "Half End") {
            addSomeEvent({
              variables: {
                matchId: matchId,
                type: state.type,
                timestamp: await ytVideoRef.current.internalPlayer.getCurrentTime(),
              },
            });
          }
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
          if (state.turnover && state.type == "Turnover") {
            addTurnoverEvent({
              variables: {
                matchId: matchId,
                player: state.player.id,
                team: state.player.currentClub.id,
                type: state.type,
                location: state.location,
                turnoverType: state.turnover.type,
                timestamp: await ytVideoRef.current.internalPlayer.getCurrentTime(),
              },
            });
          }
          if (state.punishment && state.type == "Punishment") {
            addPunishmentEvent({
              variables: {
                matchId: matchId,
                player: state.player.id,
                team: state.player.currentClub.id,
                type: state.type,
                location: state.location,
                punishmentType: state.punishment.type,
                timestamp: await ytVideoRef.current.internalPlayer.getCurrentTime(),
              },
            });
          }
        }}
      >
        ADD
      </button>
    </div>
  );
}
