import React, { useEffect } from "react";
import styled from "styled-components";

import { useQuery, gql } from "@apollo/client";

import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayerTable = styled.div`
  padding: 18px;
  overflow: scroll;
  overflow-x: hidden;
  background: #fff;
  width: 1000px;
  height: 800px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
`;

const Header = styled.div`
  display: flex;
  div {
    display: flex;
    justify-content: center;
    width: 25%;
  }
`;
const PlayerEntry = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  div {
    display: flex;
    justify-content: center;
    width: 25%;
  }
`;

const PositionDivider = styled.div`
  border-bottom: 1px solid black;
`;

const GET_PLAYERS = gql`
  query {
    playerMany {
      id
      name
      jerseyNumber
      avatar
      position
    }
  }
`;

export default function AdminSchowPlayers() {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <h3>LOADING...</h3>;

  return (
    <Wrapper>
      <PlayerTable>
        <Header>
          <div>N</div>
          <div>PLAYER</div>
          <div>DATE OF BIRTH</div>
          <div>Role</div>
        </Header>
        <PositionDivider>Goalkeepers</PositionDivider>
        {data.playerMany
          .filter((player) => player.position == "BR")
          .map((player) => {
            return <Player player={player} />;
          })}
        <PositionDivider>Back</PositionDivider>
        {data.playerMany
          .filter(
            (player) =>
              player.position == "LB" ||
              player.position == "CB" ||
              player.position == "RB"
          )
          .map((player) => {
            return <Player player={player} />;
          })}
        <PositionDivider>Wings</PositionDivider>
        {data.playerMany
          .filter(
            (player) => player.position == "LW" || player.position == "RW"
          )
          .map((player) => {
            return <Player player={player} />;
          })}
        <PositionDivider>Pivots</PositionDivider>
        {data.playerMany
          .filter((player) => player.position == "PV")
          .map((player) => (
            <Player player={player} />
          ))}
      </PlayerTable>
    </Wrapper>
  );
}

function filterPlayersByPosition(players, positions = []) {}

function Player({ player }) {
  let { pathname } = useLocation();
  console.log(pathname);
  return (
    <PlayerEntry to={`${pathname}/${player.id}`}>
      <div>{player.jerseyNumber ? player.jerseyNumber : null}</div>
      <div>{player.name}</div>
      <div>{player.jerseyNumber}</div>
      <div>{player.position}</div>
    </PlayerEntry>
  );
}
