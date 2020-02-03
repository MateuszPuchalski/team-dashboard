import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
  width: 500px;
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  h3 {
    text-align: center;
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
  const [matches, setMatches] = useState();

  const getMatches = () => {
    fetch("/api/matches")
      .then(res => res.json())
      .then(data => setMatches(data));
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <Wrapper>
      <ul>
        {matches
          ? matches.map(
              match =>
                `${match.homeTeam.name} ${match.homeScore} : ${match.awayScore} ${match.awayTeam.name}`
            )
          : null}
      </ul>
    </Wrapper>
  );
}
