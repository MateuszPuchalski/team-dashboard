import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import ClubPicker from "./ClubPicker";
const PlayerFields = styled.div`
  margin-top: 10px;

  .name {
    display: flex;
    flex-direction: row;
    input: {
      width: 50%;
    }
    .firstName {
      margin-right: 5px;
    }
    .lastName {
      margin-left: 5px;
    }
  }
  .formField {
    border: 0;
    padding: 15px 0;
    background: whitesmoke;
    width: 100%;
    margin: 10px 0;
    line-height: 1rem;
  }
`;
export default function RegisterPlayerFields() {
  const props = useSpring({
    from: {
      height: "0px",
      overflow: "hidden",
    },
    to: {
      height: "300px",
    },
    config: { mass: 1, tension: 180, friction: 16 },
  });
  return (
    <animated.div style={props}>
      <PlayerFields>
        <div className="name">
          <input
            className="formField firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            className="formField lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <ClubPicker />

        <div className="formGroup">
          <input
            className="formField"
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="formGroup">
          <input
            className="formField"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
      </PlayerFields>
    </animated.div>
  );
}
