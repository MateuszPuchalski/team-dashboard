import React from "react";

import { SELECT_PUNISHMENT_TYPE } from "./constants";

const Types = ["2min", "Blue Card", "Red Card", "Yellow Card"];

export default function PunishmentTypes({ dispatch }) {
  return (
    <div>
      <ul>
        {Types.map((item) => {
          return (
            <li
              onClick={() =>
                dispatch({ type: SELECT_PUNISHMENT_TYPE, paylode: item })
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
