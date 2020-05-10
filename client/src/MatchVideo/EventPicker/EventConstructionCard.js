import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { eventAddingActions } from "../../_actions";

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
const Add = styled.img`
  height: 35px;
  border-radius: 100%;
  background: radial-gradient(circle,rgba(0,180,255,1) 50%,rgba(84,101,213,1) 100%);
}
`;

// Math.round(
//   props.ytVideoRef.current.internalPlayer.getCurrentTime() * 100
// ) / 100
export default function EventConstructionCard(props) {
  const dispatch = useDispatch();
  const eventShape = useSelector((state) => state.eventShape);

  return (
    <Wrapper>
      <Add
        src={process.env.PUBLIC_URL + "/toggleadd.svg"}
        onClick={async () => {
          dispatch(
            eventAddingActions.addEvent({
              matchId: eventShape.match._id,
              type: eventShape.type,
              team: eventShape.player.currentClub._id,
              location: eventShape.courtCords,
              timestamp: 100,
            })
          );
        }}
      />

      <h3>{eventShape.event}</h3>
      <h4>{eventShape.eventType}</h4>
      <img src={eventShape.player && eventShape.player.avatar} />
      <h3>{eventShape.player && eventShape.player.name}</h3>
    </Wrapper>
  );
}
