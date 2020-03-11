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
  display: flex;
  flex-direction: row;
  color: black;
  background: rgba(255, 255, 255, 0.1);
  h3 {
    text-align: center;
  }
  .avatarWrapper {
    display: flex;
    flex-direction: column;
    height: 30rem;
    width: 10rem;
    overflow: scroll;
    .avatar {
      height: 3rem;
      width: 3rem;
    }
  }
  .formResult {
    display: flex;
    flex-direction: column;
  }
`;

const Result = styled.div`
  div {
    margin: 1rem 0;
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
  .period {
    border-radius: 5px;
    height: 2rem;
  }
  .matchLogo {
    height: 4rem;
    filter: grayscale(100%);
  }
  .outcome {
    border-radius: 5px;
    height: 4rem;
    width: 4rem;
    font-size: 1rem;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px;
  }
  .technique {
    border-radius: 5px;
    height: 4rem;
    width: 4rem;
    font-size: 1rem;
    background: red;
    display: flex;

    margin: 1px;
  }
  .goalType {
    border-radius: 5px;
    height: 4rem;
    width: 4rem;
    font-size: 1rem;
    background: red;
    display: flex;

    margin: 1px;
  }

  .formResult {
    div {
      padding: 1rem;
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
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [eventType, setEventType] = useState("Throw");
  const [period, setPeriod] = useState("1");
  const [outcome, setOutcome] = useState("Goal");
  const [technique, setTechnique] = useState("Jump Shot");
  const [goalType, setGoalType] = useState("Regular Play");
  const [selectedGoalkeeper, setSelectedGoalkeeper] = useState("");

  const submit = async e => {
    e.preventDefault();

    let data = {
      index: 1, //e.target.index.value
      matchId: matchId,
      period: period,
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
            assist: e.target.assist.value,
            endLocation: eventEndLocation,
            outcome: outcome,
            technique: e.target.technique.value,
            type: goalType
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
          <img
            style={
              period == "1" ? { background: "green" } : { background: "red" }
            }
            className="period"
            onClick={e => {
              setPeriod("1");
            }}
            src={`${process.env.PUBLIC_URL}/one.svg`}
          />
          <img
            style={
              period == "2" ? { background: "green" } : { background: "red" }
            }
            className="period"
            onClick={e => {
              setPeriod("2");
            }}
            src={`${process.env.PUBLIC_URL}/two.svg`}
          />
          <img
            style={
              period == "5" ? { background: "green" } : { background: "red" }
            }
            className="period"
            onClick={e => {
              setPeriod("5");
            }}
            src={`${process.env.PUBLIC_URL}/five.svg`}
          />
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
              Assist:
              <select name="assist">
                <option value="">None</option>
                {clubPlayers ? renderOptions(clubPlayers) : null}
              </select>
            </label>

            <label>
              Outcome:
              {/* <select name="outcome"> */}
              <div
                style={
                  outcome == "Goal"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setOutcome("Goal");
                }}
                className="goal outcome"
              >
                Goal
              </div>
              <div
                style={
                  outcome == "Blocked"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setOutcome("Blocked");
                }}
                className="blocked outcome"
              >
                Blocked
              </div>
              <div
                style={
                  outcome == "Post"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setOutcome("Post");
                }}
                className="post outcome"
              >
                Post
              </div>
              <div
                style={
                  outcome == "Saved"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setOutcome("Saved");
                }}
                className="saved outcome"
              >
                Saved
              </div>
              {/* <option value="Goal">Goal</option>
                <option value="Blocked">Blocked</option>
                <option value="Post">Post</option>
                <option value="Saved">Saved</option>
              </select> */}
            </label>
            <label>
              Technique:
              <div
                style={
                  technique == "Jump Shot"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setTechnique("Jump Shot");
                }}
                className="technique"
              >
                Jump Shot
              </div>
              <div
                style={
                  technique == "Overarm"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setTechnique("Overarm");
                }}
                className="technique"
              >
                Overarm
              </div>
              <div
                style={
                  technique == "Underarm"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setTechnique("Underarm");
                }}
                className="technique"
              >
                Underarm
              </div>
              <div
                style={
                  technique == "Spin Shot"
                    ? { background: "green" }
                    : { background: "red" }
                }
                onClick={() => {
                  setTechnique("Spin Shot");
                }}
                className="techinque"
              >
                Spin Shot
              </div>
            </label>
            <label>
              Goal Type:
              <div
                style={
                  goalType == "Regular Play"
                    ? { background: "green" }
                    : { background: "red" }
                }
                className="goalType"
                onClick={() => setGoalType("Regular Play")}
              >
                Regular Play
              </div>
              <div
                style={
                  goalType == "Fast Break"
                    ? { background: "green" }
                    : { background: "red" }
                }
                className="goalType"
                onClick={() => setGoalType("Fast Break")}
              >
                Fast Break
              </div>
              <div
                style={
                  goalType == "7m"
                    ? { background: "green" }
                    : { background: "red" }
                }
                className="goalType"
                onClick={() => setGoalType("7m")}
              >
                7m
              </div>
            </label>
          </>
        ) : null}
        <label>
          <img
            style={
              selectedTeam == teams[0]._id
                ? { filter: "grayscale(0%)" }
                : { filter: "grayscale(100%)" }
            }
            onClick={e => {
              setSelectedTeam(teams[0]._id);
              setSelectedPlayer("");
            }}
            className="matchLogo"
            src={teams[0].logo}
          />
          <img
            style={
              selectedTeam == teams[1]._id
                ? { filter: "grayscale(0%)" }
                : { filter: "grayscale(100%)" }
            }
            onClick={e => {
              setSelectedTeam(teams[1]._id);
              setSelectedPlayer("");
            }}
            className="matchLogo"
            src={teams[1].logo}
          />
          {/* <select
            onChange={e => {
              setSelectedTeam(e.target.value);
            }}
            name="team"
          >
            {teams ? renderOptions(teams) : null}
          </select> */}
        </label>

        <input type="submit" value="Add" />
      </Form>
      {/* PLAYER CONTAINER */}
      {eventType !== "Half Start" && eventType !== "Half End" ? (
        <div className="avatarWrapper">
          {clubPlayers
            ? clubPlayers.map(player => {
                return player.avatar ? (
                  <img
                    style={
                      selectedPlayer == player._id
                        ? { background: "green" }
                        : { background: "red" }
                    }
                    onClick={() => setSelectedPlayer(player._id)}
                    className="avatar"
                    src={player.avatar}
                  />
                ) : (
                  <p
                    style={
                      selectedPlayer == player._id
                        ? { background: "green" }
                        : { background: "red" }
                    }
                    onClick={() => setSelectedPlayer(player._id)}
                  >
                    {player.name}{" "}
                    {player.jerseyNumber ? player.jerseyNumber : null}
                  </p>
                );
              })
            : null}
        </div>
      ) : null}
      {/* Goalkeepers */}
      <div className="goalkeepers">
        {clubPlayers
          ? clubPlayers.map(player => {
              if (player.position == "BR") {
                return (
                  <p
                    style={
                      selectedGoalkeeper == player._id
                        ? { background: "green" }
                        : { background: "red" }
                    }
                    onClick={() => {
                      setSelectedGoalkeeper(player._id);
                    }}
                  >
                    {player.name}
                  </p>
                );
              }
            })
          : null}
      </div>
      <div>
        {eventType === "Throw" ? (
          <AdminGoalChart
            eventEndLocation={eventEndLocation}
            setEventEndLocation={setEventEndLocation}
            scale={120}
          />
        ) : null}
        <AdminCourtChart
          eventLocation={eventLocation}
          setEventLocation={setEventLocation}
          scale={9}
        />
      </div>
      <Result>
        <div>Period: {period}</div>
        <div>Team: {selectedTeam}</div>
        <div>Player: {clubPlayers ? selectedPlayer : null}</div>
        <div>Outcome: {outcome}</div>
        <div>Technique: {technique}</div>
        <div>Goal Type: {goalType}</div>
      </Result>
    </Wrapper>
  );
}
