import React, { useReducer, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import { useParams } from "react-router-dom";
const SELECT_TYPE = "SELECT_TYPE";
const SELECT_THROW_OUTCOME = "SELECT_THROW_OUTCOME";
const SELECT_THROW_TECHNIQUE = "SELECT_THROW_TECHNIQUE";
const SELECT_TURNOVER_TYPE = "SELECT_TURNOVER_TYPE";
const SELECT_PUNISHMENT_TYPE = "SELECT_PUNISHMENT_TYPE";
const SELECT_PLAYER = "SELECT_PLAYER";
const EventTypes = [
  "Half Start",
  "Half End",
  "Throw",
  "Turnover",
  "Punishment",
];

const ThrowOutcomes = ["Goal", "Miss", "Blocked"];
const ThrowTechinques = ["Overarm", "Hip", "Jump"];
const PunishmentTypes = ["2min", "Blue Card", "Red Card", "Yellow Card"];
const TurnoverTypes = ["Catch", "Pass", "Dribble"];

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_TYPE:
      return { type: action.paylode };
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

// ToDo:
//  add timestamp
// add player
//
//What i Need
//  match id hometeamid awayteamid
const GET_MATCH = gql`
  query($matchId: String!) {
    matchById(matchId: $matchId) {
      id
      homeTeam {
        name
        players {
          id
          name
        }
      }
      awayTeam {
        name
        players {
          id
          name
        }
      }
    }
  }
`;

const ADD_THROW_EVENT = gql`
  mutation AddThrowEvent(
    $matchId: String!
    $playerId: String!
    $teamId: String!
    $type: String!
    $location: [Float]!
    $endLocation: [Float]!
    $outcome: String
    $technique: String
    $timestamp: Float!
  ) {
    addThrowEvent(
      matchId: $matchId
      playerId: $playerId
      teamId: $teamId
      type: $type
      location: $location
      endLocation: $endLocation
      outcome: $outcome
      technique: $technique
      timestamp: $timestamp
    )
  }
`;
export default function EventPicker() {
  const { matchId } = useParams();
  const [state, dispatch] = useReducer(reducer, { matchId: matchId });
  const [addThrowEvent] = useMutation(ADD_THROW_EVENT);
  const { loading, error, data } = useQuery(GET_MATCH, {
    variables: { matchId: matchId },
  });
  // const { loading, error, playersData } = useQuery(GET_MATCH, {
  //   variables: { matchId: matchId },
  // });

  useEffect(() => {
    console.log({ Matchdata: data });
  }, [data]);
  return (
    <div>
      <ul>
        {EventTypes.map((item) => {
          return (
            <li onClick={() => dispatch({ type: SELECT_TYPE, paylode: item })}>
              {item}
            </li>
          );
        })}
      </ul>

      {state.type == "Throw" && (
        <div>
          <ul>
            {ThrowOutcomes.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_THROW_OUTCOME, paylode: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {state.type == "Throw" && (
        <div>
          <ul>
            {ThrowTechinques.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_THROW_TECHNIQUE, paylode: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {state.type == "Punishment" && (
        <div>
          <ul>
            {PunishmentTypes.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_PUNISHMENT_TYPE, paylode: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {state.type == "Turnover" && (
        <div>
          <ul>
            {TurnoverTypes.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_TURNOVER_TYPE, paylode: item })
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!loading && (
        <div>
          <ul>
            {data.matchById.homeTeam.players.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_PLAYER, paylode: item.id })
                  }
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!loading && (
        <div>
          <ul>
            {data.matchById.awayTeam.players.map((item) => {
              return (
                <li
                  onClick={() =>
                    dispatch({ type: SELECT_PLAYER, paylode: item.id })
                  }
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <button
        onClick={() =>
          addThrowEvent({
            variables: {
              matchId: matchId,
              playerId: "5e3606a51dba6b0ac451eb42",
              teamId: "5e259ca1c60ff01770db40ff",
              type: "Throw",
              location: [1, 1],
              endLocation: [1, 1],
              outcome: "Goal",
              technique: "Hip Shot",
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
