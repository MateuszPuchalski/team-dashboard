import React from "react";
import styled from "styled-components";
import { useAuth } from "../useAuth";

export default function AddPlayer() {
  const auth = useAuth();

  const submit = e => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      currentClub: "5e1feda70ec36c0758e36b97",
      position: e.target.position.value,
      weight: e.target.weight.value,
      height: e.target.height.value,
      jerseyNumber: e.target.jerseyNumber.value,
      date: e.target.date.value,
      addBy: auth.user.user.id
    };
    console.log(data);
    fetch("/api/players/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log({ fromPOST: data });
      })
      .catch(err => console.error(err));
  };
  return (
    <form onSubmit={submit}>
      <label>
        Name:
        <input type="text" name="name" />
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
        Weight:
        <input type="number" name="weight" />
      </label>
      <label>
        Height:
        <input type="number" name="height" />
      </label>
      <label>
        Nr:
        <input type="number" name="jerseyNumber" />
      </label>
      <label>
        Birth Date:
        <input type="date" name="date" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
