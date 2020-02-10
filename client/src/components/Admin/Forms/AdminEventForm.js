import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../Hooks/useClubs";
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
export default function AdminEventForm() {
  const [clubsLoading, clubs] = useClubs();
  const [matchesLoading, matches] = useMatches();

  useEffect(() => {
    console.log({ Clubs: clubs });
  }, [clubs]);

  const submit = e => {
    e.preventDefault();
    const data = {
      index: 1, //e.target.index.value
      matchId: "5e3758f1e60e452598df6397",
      period: e.target.period.value,
      timestamp: 100, // e.target.timestamp.value
      type: e.target.type.value,
      team: e.target.team.value,
      player: e.target.player.value,
      location: { x: 30, y: 10 }, //e.target.location.value
      throw: {
        endLocation: { y: 10, z: 1.2 },
        outcome: "goal",
        technique: "jumpShot",
        type: "regularPlay"
      }
    };

    fetch("/api/event/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log({ newEvent: data });
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
      <Form onSubmit={submit}>
        <label>
          Period:{" "}
          <select name="period">
            <option value="1">First Half</option>
            <option value="2">Second Half</option>
          </select>
        </label>
        <label>
          Type:
          <select name="type">
            <option value="throw">Throw</option>
            <option value="halftStart">Half Start</option>
          </select>
        </label>
        <label>
          Team:
          <select name="team">{clubs ? renderClubs(clubs) : null}</select>
        </label>
        <label>
          Player:{" "}
          <select name="player">
            <option value="5e3606a51dba6b0ac451eb42">Mateusz Puchalski</option>
            {/* <option value="2">Second Half</option> */}
          </select>
        </label>
        <input type="submit" value="Add" />
      </Form>
    </Wrapper>
  );
}
