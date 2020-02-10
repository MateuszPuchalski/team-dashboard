import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../Hooks/useClubs";

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
export default function AdminMatches() {
  const [clubsLoading, clubs] = useClubs();

  const submit = e => {
    e.preventDefault();
    const data = {
      competition: "5e1feda70ec36c0758e36b97",
      matchDate: e.target.matchDate.value,
      homeTeam: e.target.homeTeam.value,
      awayTeam: e.target.awayTeam.value,
      homeScore: e.target.homeScore.value,
      awayScore: e.target.awayScore.value,
      ytId: e.target.ytId.value
    };

    fetch("/api/matches/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log({ newMatch: data });
      })
      .catch(err => console.error(err));
  };

  const renderClubs = clubs => {
    const arr = clubs.map((club, i) => {
      return (
        <option id={club._id} value={club._id}>
          {club.name}
        </option>
      );
    });
    return arr;
  };

  return (
    <Wrapper>
      <h3>Add Match</h3>
      <Form onSubmit={submit}>
        <label>
          Home Team:
          <select name="homeTeam">{clubs ? renderClubs(clubs) : null}</select>
        </label>
        <label>
          Home Score:
          <input type="number" name="homeScore" />
        </label>
        <label>
          Away Score: <input type="number" name="awayScore" />
        </label>
        <label>
          Away Team:
          <select name="awayTeam">{clubs ? renderClubs(clubs) : null}</select>
        </label>
        <label>
          Date:
          <input type="date" name="matchDate" />
        </label>
        <label>
          Youtube Id: <input type="text" name="ytId" />
        </label>

        <input type="submit" value="Add" />
      </Form>
    </Wrapper>
  );
}
