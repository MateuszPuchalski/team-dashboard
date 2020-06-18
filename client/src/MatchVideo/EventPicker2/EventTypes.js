import React from "react";

import { SELECT_TYPE } from "./constants";

const Types = ["Half Start", "Half End", "Throw", "Turnover", "Punishment"];

export default function EventTypes({ dispatch }) {
  return (
    <div>
      <ul>
        {Types.map((item) => {
          return (
            <li onClick={() => dispatch({ type: SELECT_TYPE, paylode: item })}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
