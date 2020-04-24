import React, { useState } from "react";
import styled from "styled-components";

const Picker = styled.div`
  position: relative;
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
    position: absolute;
    left: 5px;
    top: 50px;
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    .addClub {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      span {
        margin-left: 20px;
      }
      img {
        margin-right: 20px;
        height: 20px;
      }
    }
    li {
      padding: 1rem 5px;

      &:hover {
        cursor: pointer;
        background-color: whitesmoke;
      }
    }
  }
`;

export default function ClubPicker() {
  const [toggle, setToggle] = useState(false);
  return (
    <Picker
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <span>Select Club</span>
      <img src={process.env.PUBLIC_URL + "/sort.svg"} />
      <ul style={toggle ? { display: "block" } : { display: "none" }}>
        <li className="addClub">
          <span>Add Club</span>
          <img src={process.env.PUBLIC_URL + "/add.svg"} />
        </li>
        {/* {["Club", "Player", "Coach"].map((item, i) => {
          return (
            <li key={i} onClick={() => {}}>
              {item}
            </li>
          );
        })} */}
      </ul>
    </Picker>
  );
}
