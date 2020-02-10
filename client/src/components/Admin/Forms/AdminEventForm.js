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
export default function AdminEventForm() {
  const [clubsLoading, clubs] = useClubs();

  const submit = e => {
    e.preventDefault();
    const data = {
      index: e.target.index.value,
      matchId: "5e3758f1e60e452598df6397",
      period: e.target.period.value,
      timestamp: e.target.timestamp.value,
      on: e.target.height.value,
      onType: e.target.onType.value,
      team: e.target.team.value,
      player: e.target.player.value,
      location: e.target.location.value
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

  return <div></div>;
}
