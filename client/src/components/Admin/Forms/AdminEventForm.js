import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../../../Hooks/useClubs";
import useMatches from "../../../Hooks/useMatches";
import useClubPlayers from "../../../Hooks/useClubPlayers";

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
export default function AdminEventForm({ teams, matchId, eventLocation }) {
  const [matchesLoading, matches] = useMatches();
  const [selectedTeam, setSelectedTeam] = useState(teams[0]._id);
  const [clubPlayersLoading, clubPlayers] = useClubPlayers(selectedTeam);

  const submit = e => {
    e.preventDefault();
    console.log({ target: e.target.team });
    const data = {
      index: 1, //e.target.index.value
      matchId: matchId,
      period: e.target.period.value,
      timestamp: 100, // e.target.timestamp.value
      type: e.target.eventType.value,
      team: e.target.team.value,
      player: e.target.player.value,
      location: eventLocation, //e.target.location.value
      throw: {
        endLocation: { x: 20, y: 10, z: 1.2 },
        outcome: e.target.outcome.value,
        technique: e.target.technique.value,
        type: e.target.goalType.value
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

  const renderOptions = items => {
    const arr = items.map((item, i) => {
      if (item.jerseyNumber) {
        return (
          <option id={item._id} value={item._id}>
            {item.jerseyNumber} {item.name}
          </option>
        );
      } else {
        return (
          <option id={item._id} value={item._id}>
            {item.name}
          </option>
        );
      }
    });
    return arr;
  };
  return (
    <Wrapper>
      {/* Zrobić warunkowe wyświtlanie formy */}
      <Form onSubmit={submit}>
        <label>
          Period:
          <select name="period">
            <option value="1">First Half</option>
            <option value="2">Second Half</option>
            <option value="5">Peneltys</option>
          </select>
        </label>
        <label>
          Type:
          <select name="eventType">
            <option value="throw">Throw</option>
            <option value="block">Block</option>
            <option value="halftStart">Half Start</option>
          </select>
        </label>
        <label>
          Outcome:
          <select name="outcome">
            <option value="goal">Goal</option>
            <option value="blocked">Blocked</option>
            <option value="post">Post</option>
            <option value="saved">Saved</option>
          </select>
        </label>
        <label>
          Technique:
          <select name="technique">
            <option value="jumpShot">Jump Shot</option>
            <option value="overarm">Overarm</option>
            <option value="underarm">Underarm</option>
            <option value="spinShot">Spin Shot</option>
          </select>
        </label>
        <label>
          Type:
          <select name="tygoalType">
            <option value="regularPlay">Regular Play</option>
            <option value="counter">Counter</option>
            <option value="penalty">Penalty</option>
          </select>
        </label>
        <label>
          Team:
          <select
            onChange={e => {
              setSelectedTeam(e.target.value);
            }}
            name="team"
          >
            {teams ? renderOptions(teams) : null}
          </select>
        </label>
        <label>
          Players:{" "}
          <select name="player">
            {clubPlayers ? renderOptions(clubPlayers) : null}
          </select>
        </label>

        <input type="submit" value="Add" />
      </Form>
    </Wrapper>
  );
}
