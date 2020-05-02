import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

const Wrapper = styled.div`
  background: ${(props) => props.theme.primary};
  box-sizing: content-box;
  height: minmax(120px, auto);
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 55px;
  }
`;
const Toggle = styled.img`
  height: 35px;
  border-radius: 100%;
  background: radial-gradient(circle,rgba(0,180,255,1) 50%,rgba(84,101,213,1) 100%);
}
`;
const eventParameters = [
  "match",
  "awayPlayers",
  "homePlayers",
  "courtCords",
  "eventType",
  "event",
  "player",
  "goalCords",
];

// Math.round(
//   props.ytVideoRef.current.internalPlayer.getCurrentTime() * 100
// ) / 100
export default function EventConstructionCard(props) {
  const eventShape = useSelector((state) => state.eventShape);
  const player = useSelector((state) => state.eventShape.player);

  const euqualArrays = (a, b) => {
    let equal = true;
    a.forEach((element) => {
      if (!b.includes(element)) {
        equal = false;
      }
    });
    return equal;
  };
  return (
    <Wrapper>
      {euqualArrays(eventParameters, Object.keys(eventShape)) ? (
        <Toggle
          src={process.env.PUBLIC_URL + "/toggleadd.svg"}
          onClick={async () => {
            const time = await props.ytVideoRef.current.internalPlayer.getCurrentTime();
            console.log(time);
          }}
        />
      ) : null}
      <h3>{eventShape.event}</h3>
      <h4>{eventShape.eventType}</h4>
      <img src={player ? player.avatar : ""} />
      <h3>{player ? player.name : null}</h3>
    </Wrapper>
  );
}
