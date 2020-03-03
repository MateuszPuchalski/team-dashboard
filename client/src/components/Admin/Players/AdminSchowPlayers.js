import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import usePlayers from "../../../Hooks/usePlayers";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Card = styled.div`
  display: flex;
  width: 20rem;
  height: 50rem;
  flex-direction: column;

  overflow: scroll;

  div {
    height: 4rem;
    background: blue;
    padding: 1rem;
    img {
      height: 4rem;
    }
    &:hover {
      background: green;
    }
  }
`;

export default function AdminSchowPlayers() {
  const [loading, players] = usePlayers();
  console.log({ Players: players });
  return (
    <Card>
      {players
        ? players.map(player => (
            <StyledLink to={`/admin/players/${player._id}`}>
              <div>
                <img src={player.avatar} />
                <span>{player.name}</span>
              </div>
            </StyledLink>
          ))
        : null}
    </Card>
  );
}
