import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useMatches from "../Hooks/useMatches";

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
  const [matchesLoading, matches] = useMatches();

  return (
    <Wrapper>
      <ul>
        {matches
          ? matches.map(match => (
              <li>
                {match.homeTeam.name} {match.homeScore} : {match.awayScore}{" "}
                {match.awayTeam.name}
              </li>
            ))
          : null}
      </ul>
    </Wrapper>
  );
}
