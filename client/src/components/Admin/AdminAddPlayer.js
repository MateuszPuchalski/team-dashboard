import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../../Hooks/useClubs";

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

export default function AdminAddPlayer() {
  const [clubsLoading, clubs] = useClubs();

  const submit = e => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      currentClub: e.target.currentClub.value,
      position: e.target.position.value,
      weight: e.target.weight.value,
      height: e.target.height.value,
      jerseyNumber: e.target.jerseyNumber.value,
      date: e.target.date.value
    };

    fetch("/api/players/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log({ newPlayer: data });
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
      <h3>Add Player</h3>
      <Form onSubmit={submit}>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Position:
          <select name="position">
            <option value="BR">Bramkarz</option>
            <option value="LW">Lewe Skrzydło</option>
            <option value="LB">Lewe Rozegranie</option>
            <option value="CB">Środkowe Rozegranie</option>
            <option value="RB">Prawe Rozegranie</option>
            <option value="RW">Prawe Skrzydło</option>
            <option value="PV">Koło</option>
          </select>
        </label>
        <label>
          Current Club:
          <select name="currentClub">
            {clubs ? renderClubs(clubs) : null}
          </select>
        </label>
        <label>
          Weight: <input type="number" name="weight" />
        </label>
        <label>
          Height: <input type="number" name="height" />
        </label>
        <label>
          Nr: <input type="number" name="jerseyNumber" />
        </label>
        <label>
          Birth Date:
          <input type="date" name="date" />
        </label>
        <input type="submit" value="Add" />
      </Form>
    </Wrapper>
  );
}

// name: { type: String, required: true },
//     currentClub: { type: Schema.Types.ObjectId, ref: "Club" }, // add refrence to club model
//     position: { type: String },
//     weight: { type: Number },
//     height: { type: Number },
//     jerseyNumber: { type: Number },
//     date: { type: Date },
//     addBy: { type: Schema.Types.ObjectId, ref: "User" }
