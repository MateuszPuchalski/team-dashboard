import React from "react";
import styled from "styled-components";

export default function AddPlayer() {
  //todo:

  return (
    <form>
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
