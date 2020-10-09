import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SELECT_PLAYER } from "../constants";

const PlayerWrapper = styled.div`
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

const PlayerDiv = styled.div`
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

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

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

export default function PlayerPickerForm({ dispatch, state }) {
  const { matchId } = useParams();
  const [togglePlayers, setTogglePlayers] = useState(true);

  const { loading, error, data } = useQuery(GET_MATCH, {
    variables: { matchId: matchId },
  });
  useEffect(() => {
    console.log(state);
  }, [state]);
  if (loading) return <PlayerDiv>Loading...</PlayerDiv>;
  console.log(data);
  return (
    <>
      {state.player && !togglePlayers ? (
        <PlayerDiv
          onClick={(e) => {
            setTogglePlayers(!togglePlayers);
            e.stopPropagation();
          }}
        >
          <img src={state.player.avatar} /> {state.player.name}
        </PlayerDiv>
      ) : (
        <PlayerWrapper>
          Away:
          {togglePlayers === true
            ? data.matchById.awayTeam.players.map((player) => {
                return (
                  <PlayerDiv
                    key={player.id}
                    onClick={(e) => {
                      dispatch({ type: SELECT_PLAYER, paylode: player });
                      setTogglePlayers(!togglePlayers);
                      e.stopPropagation();
                    }}
                  >
                    <img src={player.avatar} /> {player.name}
                  </PlayerDiv>
                );
              })
            : null}
            <div style={{width: "100px", height: "50px"}}></div>
            Home:
          {togglePlayers === true
            ? data.matchById.homeTeam.players.map((player) => {
                return (
                  <PlayerDiv
                    key={player.id}
                    onClick={(e) => {
                      dispatch({ type: SELECT_PLAYER, paylode: player });
                      setTogglePlayers(!togglePlayers);
                      e.stopPropagation();
                    }}
                  >
                    <img src={player.avatar} /> {player.name}
                  </PlayerDiv>
                );
              })
            : null}
        </PlayerWrapper>
      )}
    </>
  );
}
