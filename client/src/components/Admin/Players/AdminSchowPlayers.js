import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import usePlayers from "../../../Hooks/usePlayers";

const textPrimary = "white";
const textSecondary = "#ececec";
const bgPrimary = "#9FA2B2";
const bgSecondary = "#16262E";
const transitionSpeed = "200ms";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const PlayerTable = styled.table`
  display: table;

  overflow: scroll;
  background: ${bgSecondary};
  img {
    height: 4rem;
  }

  tr {
    box-sizing: border-box;
    &:hover {
      background: green;
    }
  }
`;

export default function AdminSchowPlayers() {
  const [loading, players] = usePlayers();

  return (
    <PlayerTable>
      <tbody>
        {players
          ? players.map(player => (
              <tr>
                <StyledLink to={`/admin/players/${player._id}`}>
                  <td>
                    <img src={player.avatar} />
                    <span>{player.name}</span>
                  </td>
                  <td>
                    <span>04-03-1996</span>
                  </td>
                  <td>
                    <span>{player.position}</span>
                  </td>
                </StyledLink>
              </tr>
            ))
          : null}
      </tbody>
    </PlayerTable>
  );
}
