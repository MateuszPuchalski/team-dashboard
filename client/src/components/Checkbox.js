import React from "react";
import styled from "styled-components";
import { SELECT_THROW_OUTCOME } from "../MatchVideo/EventPicker2/constants";

const Wrapper = styled.div`
  .switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }

  .switch input {
    display: none;
  }

  .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  input:checked + .slider {
    background-color: #66bb6a;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .container {
    margin: 0 auto;
  }
`;
export default function Checkbox({ dispatch }) {
  return (
    <Wrapper>
      <div className="container">
        <label className="switch" for="checkbox">
          <input
            onClick={(e) => {
              if (e.target.checked) {
                dispatch({ type: SELECT_THROW_OUTCOME, paylode: "Blocked" });
              } else {
                dispatch({ type: SELECT_THROW_OUTCOME, paylode: "" });
              }
            }}
            type="checkbox"
            id="checkbox"
          />
          <div className="slider round"></div>
        </label>
      </div>
    </Wrapper>
  );
}
