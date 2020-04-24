import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
const Role = styled.div`
  position: relative;
  z-index: 100;
  background: "whitesmoke";
  padding: 15px 0;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
  span {
    font-weight: bold;
  }
  img {
    height: 10px;
  }
  ul {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    top: 50px;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    li {
      padding: 1rem;

      &:hover {
        cursor: pointer;
        background-color: whitesmoke;
      }
    }
  }
`;

export default function RolePicker({ role, setRole }) {
  const [toggle, setToggle] = useState(false);
  const props = useSpring(
    toggle
      ? {
          from: { height: "0px" },
          to: { height: "150px" },
          config: { mass: 1, tension: 180, friction: 16 },
        }
      : {
          to: { height: "0px" },
          from: { height: "150px" },
          config: { mass: 1, tension: 180, friction: 16 },
        }
  );

  return (
    <Role
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <span>{role}</span>
      <img src={process.env.PUBLIC_URL + "/sort.svg"} />

      <animated.ul style={props}>
        {["Club", "Player", "Coach"].map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setRole(item);
                setToggle(!toggle);
              }}
            >
              {item}
            </li>
          );
        })}
      </animated.ul>
    </Role>
  );
}
