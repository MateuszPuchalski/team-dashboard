import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

import MatchCard from "../../MatchCard";
import AddMatch from "../../AddMatch";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Wrapper = styled.div`
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 80px;
`;

const MATCHES = gql`
  query {
    matchMany {
      id
      date
      homeTeam {
        name
        logo
      }
      awayTeam {
        name
        logo
      }
      homeScore
      awayScore
      ytId
    }
  }
`;

export default function AdminSchowMatches() {
  const location = useLocation();
  const { loading, error, data } = useQuery(MATCHES);

  if (loading) return <h3>LOADING...</h3>;

  return (
    <Wrapper>
      {data.matchMany.map((match) =>
        match.ytId ? (
          <StyledLink to={`matches/${match.id}`}>
            <MatchCard match={match} />
          </StyledLink>
        ) : (
          <MatchCard match={match} />
        )
      )}
      <AddMatch />
    </Wrapper>
  );
}
