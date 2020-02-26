import React from "react";
import styled from "styled-components";

import { Link, useLocation } from "react-router-dom";

import useMatches from "../../../Hooks/useMatches";

const Wrapper = styled.div`
  margin: 10px;
  width: 500px;
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  h3 {
    text-align: center;
  }
  li {
    margin: 10px;
  }
`;
export default function AdminPlayerMatches() {
  const location = useLocation();
  const [matchesLoading, matches] = useMatches();

  return (
    <Wrapper>
      <ul>
        {matches
          ? matches.map(match =>
              match.ytId ? (
                <Link to={`${location.pathname}/matches/${match._id}`}>
                  <li>
                    {match.homeTeam.name} {match.homeScore} : {match.awayScore}{" "}
                    {match.awayTeam.name} |YT|
                  </li>
                </Link>
              ) : (
                <li>
                  {match.homeTeam.name} {match.homeScore} : {match.awayScore}{" "}
                  {match.awayTeam.name}
                </li>
              )
            )
          : null}
      </ul>
    </Wrapper>
  );
}
