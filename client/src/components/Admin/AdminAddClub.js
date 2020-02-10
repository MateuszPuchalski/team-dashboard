import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "./Hooks/useClubs";
import useCompetitions from "./Hooks/useCompetitions";

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
    display: flex;
    span {
      display: block;
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

export default function AddClub() {
  const [competitionsLoading, competitions] = useCompetitions();
  const [clubsLoading, clubs] = useClubs();

  const submit = e => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      competition: e.target.competition.value
    };

    fetch("/api/clubs/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        // getClubs();
      })
      .catch(err => console.error(err));
    e.target.name.value = "";
  };

  const renderCompetitions = competitions => {
    const arr = competitions.map((comp, i) => {
      if (i === 0) {
        return (
          <option key={i} value={comp._id} defaultValue>
            {comp.name}
          </option>
        );
      }
      return (
        <option key={i} value={comp._id}>
          {comp.name}
        </option>
      );
    });

    return arr;
  };

  return (
    <Wrapper>
      <h3>Add Club</h3>
      <Form onSubmit={submit}>
        <label>
          <span>Club name:</span>
          <input type="text" name="name" />
        </label>

        <label>
          <span>League:</span>
          <select name="competition">
            {competitions ? renderCompetitions(competitions) : "Loading..."}
          </select>
        </label>
        <input type="submit" value="Add" />
      </Form>
      <hr />
      <div>
        <ul>
          {clubs
            ? clubs.map(club => <li key={club.id}>{club.name}</li>)
            : "Loading..."}
        </ul>
      </div>
    </Wrapper>
  );
}
