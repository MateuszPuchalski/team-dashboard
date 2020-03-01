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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    padding: 10px;
  }
  label {
    width: auto;
    span {
      margin: 10px;
      text-align: center;
    }
    select {
      display: block;
      margin: auto;
      padding: 10px;
    }
  }
`;

export default function AdminSchowMatches() {
  const location = useLocation();
  const [matchesLoading, matches] = useMatches();

  return (
    <Wrapper>
      <ul>
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
      </ul>
    </Wrapper>
  );
}
