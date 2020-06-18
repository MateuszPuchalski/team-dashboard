import React from "react";

import { SELECT_THROW_OUTCOME } from "./constants";

const Outcomes = ["Goal", "Miss", "Blocked"];

export default function ThrowOutcomes({ dispatch }) {
  return (
    <div>
      <ul>
        {Outcomes.map((item) => {
          return (
            <li
              onClick={() =>
                dispatch({ type: SELECT_THROW_OUTCOME, paylode: item })
              }
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
