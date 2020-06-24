import React from "react";
import styled from "styled-components";

import { SELECT_PLAYER } from "./constants";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin: 15px 0;
`;
const TypeBox = styled.div`
  box-sizing: border-box;
  padding: 10px;
  flex: 30%;
  color: black;
  background: whitesmoke;
  border-radius: 5px;
  margin: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  img {
    width: 50px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function Players({ players, dispatch, state }) {
  return (
    <Wrapper>
      {players.map((item) => {
        return (
          <TypeBox
            style={
              state.player && state.player.id == item.id
                ? { opacity: 1 }
                : state.player
                ? { opacity: 0.4 }
                : { opacity: 1 }
            }
            onClick={() => dispatch({ type: SELECT_PLAYER, paylode: item })}
          >
            <img src={item.avatar} />
            <h5>{item.name}</h5>
            {/* <h3>{item.jerseyNumber}</h3> */}
          </TypeBox>
        );
      })}
    </Wrapper>
  );
}
