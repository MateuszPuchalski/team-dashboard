import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

import useMatches from "../../../Hooks/useMatches";

import MatchCard from "../../MatchCard";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Wrapper = styled.div`
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 10px;
  padding: 10px;
`;

export default function AdminSchowMatches() {
  const location = useLocation();
  const [matchesLoading, matches] = useMatches();

  return (
    <Wrapper>
      {matches
        ? matches.map(match =>
            match.ytId ? (
              <StyledLink to={`matches/${match._id}`}>
                <MatchCard match={match} />
              </StyledLink>
            ) : (
              <MatchCard match={match} />
            )
          )
        : null}
    </Wrapper>
  );
}
