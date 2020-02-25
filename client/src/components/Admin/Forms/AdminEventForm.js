import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useClubs from "../../../Hooks/useClubs";
import useMatches from "../../../Hooks/useMatches";
import useClubPlayers from "../../../Hooks/useClubPlayers";

import AdminCourtChart from "../Charts/AdminCourtChart";
import AdminGoalChart from "../Charts/AdminGoalChart";

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
export default function AdminEventForm({
  teams,
  matchId,
  ytVideoRef,
  eventLocation,
  eventEndLocation,
  setEventLocation,
  setEventEndLocation
}) {
  const [matchesLoading, matches] = useMatches();
  const [selectedTeam, setSelectedTeam] = useState(teams[0]._id);
  const [clubPlayersLoading, clubPlayers] = useClubPlayers(selectedTeam);
  const [eventType, setEventType] = useState("Throw");

  const submit = async e => {
    e.preventDefault();

    let data = {
      index: 1, //e.target.index.value
      matchId: matchId,
      period: e.target.period.value,
      //timestamp
      type: e.target.eventType.value,
      team: e.target.team.value,
      location: eventLocation //e.target.location.value
    };

    switch (eventType) {
      case "Throw":
        data = { ...data, player: e.target.player.value };
        data = {
          ...data,
          throw: {
            endLocation: eventEndLocation,
            outcome: e.target.outcome.value,
            technique: e.target.technique.value,
            type: e.target.goalType.value
          }
        };
        break;
      case "Bad Behaviour":
        data = { ...data, player: e.target.player.value };
        data = { ...data, badBehaviour: e.target.badBehaviour.value };
        break;
      case "Turnover":
        data = { ...data, player: e.target.player.value };
        data = { ...data, turnover: e.target.turnover.value };
        break;
    }
    // add timestamp from yt video this must be in the end becouse of event null
    data = {
      ...data,
      timestamp:
        Math.round(
          (await ytVideoRef.current.internalPlayer.getCurrentTime()) * 100
        ) / 100
    };

    fetch("/api/events/add", {
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
      {/* get timestamp from video*/}
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
          <select
            onChange={e => {
              setEventType(e.target.value);
            }}
            name="eventType"
          >
            <option value="Throw">Throw</option>
            <option value="Turnover">Turnover</option>
            <option value="Block">Block</option>
            <option value="Half Start">Half Start</option>
            <option value="Half End">Half End</option>
            <option value="Bad Behaviour">Bad Behaviour</option>
          </select>
        </label>
        {eventType === "Bad Behaviour" ? (
          <label>
            Bad Behaviour:
            <select name="badBehaviour">
              <option value="Yellow Card">Yellow Card</option>
              <option value="2min">2min</option>
              <option value="Red Card">Red Card</option>
              <option value="Blue Card">Blue Card</option>
            </select>
          </label>
        ) : null}

        {eventType === "Turnover" ? (
          <label>
            Turnover:
            <select name="turnover">
              <option value="Pass">Pass</option>
              <option value="Catch">Catch</option>
              <option value="Dribble">Dribble</option>
            </select>
          </label>
        ) : null}
        {eventType === "Throw" ? (
          <>
            <label>
              Outcome:
              <select name="outcome">
                <option value="Goal">Goal</option>
                <option value="Blocked">Blocked</option>
                <option value="Post">Post</option>
                <option value="Saved">Saved</option>
              </select>
            </label>
            <label>
              Technique:
              <select name="technique">
                <option value="Jump Shot">Jump Shot</option>
                <option value="Overarm">Overarm</option>
                <option value="Underarm">Underarm</option>
                <option value="Spin Shot">Spin Shot</option>
              </select>
            </label>
            <label>
              Type:
              <select name="goalType">
                <option value="Regular Play">Regular Play</option>
                <option value="Fast Break">Fast Break</option>
                <option value="7m">7m</option>
              </select>
            </label>
          </>
        ) : null}
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
        {eventType !== "Half Start" && eventType !== "Half End" ? (
          <label>
            Players:{" "}
            <select name="player">
              {clubPlayers ? renderOptions(clubPlayers) : null}
            </select>
          </label>
        ) : null}

        <input type="submit" value="Add" />
      </Form>

      <AdminCourtChart
        eventLocation={eventLocation}
        setEventLocation={setEventLocation}
        scale={9}
      />

      {eventType === "Throw" ? (
        <AdminGoalChart
          eventEndLocation={eventEndLocation}
          setEventEndLocation={setEventEndLocation}
          scale={120}
        />
      ) : null}
    </Wrapper>
  );
}
