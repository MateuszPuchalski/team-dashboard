import React from "react";
import { SELECT_PLAYER } from "./constants";
export default function Players({ players, dispatch }) {
  return (
    <div>
      <ul>
        {players.map((item) => {
          return (
            <li
              onClick={() => dispatch({ type: SELECT_PLAYER, paylode: item })}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
