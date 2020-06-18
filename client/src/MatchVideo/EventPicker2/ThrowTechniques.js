import React from "react";

import { SELECT_THROW_TECHNIQUE } from "./constants";

const Techinques = ["Overarm Shot", "Hip Shot", "Jump Shot"];

export default function ThrowTechinques({ dispatch }) {
  return (
    <div>
      <ul>
        {Techinques.map((item) => {
          return (
            <li
              onClick={() =>
                dispatch({ type: SELECT_THROW_TECHNIQUE, paylode: item })
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
