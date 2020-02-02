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
export default function AdminMatches() {
  const [clubs, setClubs] = useState();

  const getClubs = () => {
    fetch("/api/clubs", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setClubs(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getClubs();
  }, []);

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
      <Form>
        <label>
          Home Team:
          <select name="homeTeam">{clubs ? renderClubs(clubs) : null}</select>
        </label>
        <label>
          Away Team:
          <select name="currentClub">
            {clubs ? renderClubs(clubs) : null}
          </select>
        </label>
      </Form>
    </Wrapper>
  );
}
