import React from "react";
import { SELECT_TURNOVER_TYPE } from "./constants";

const Types = ["Catch", "Pass", "Dribble"];

export default function TurnoverTypes({ dispatch }) {
  return (
    <div>
      <ul>
        {Types.map((item) => {
          return (
            <li
              onClick={() =>
                dispatch({ type: SELECT_TURNOVER_TYPE, paylode: item })
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
