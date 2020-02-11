import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../Hooks/useClubs";
import useMatches from "../Hooks/useMatches";
import useClubPlayers from "../Hooks/useClubPlayers";

const Wrapper = styled.div`
  margin: 10px;
  width: auto;
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
  const [clubPlayersLoading, clubPlayers] = useClubPlayers(
    "5e259ca1c60ff01770db40ff"
  );

  const submit = e => {
    e.preventDefault();
    const data = {
      index: 1, //e.target.index.value
      matchId: e.target.match.value,
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

  const renderPlayers = players => {
    const arr = players.map((player, i) => {
      return (
        <option id={player._id} value={player._id}>
          {player.name}
        </option>
      );
    });
    return arr;
  };

  const renderMatches = matches => {
    const arr = matches.map((match, i) => {
      return (
        <option id={match._id} value={match._id}>
          {match.name}
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
          Players:{" "}
          <select name="player">
            {clubPlayers ? renderPlayers(clubPlayers) : null}
          </select>
        </label>
        <label>
          Matches:{" "}
          <select name="match">
            {matches ? renderMatches(matches) : null}
          </select>
        </label>
        <input type="submit" value="Add" />
      </Form>
    </Wrapper>
  );
}
