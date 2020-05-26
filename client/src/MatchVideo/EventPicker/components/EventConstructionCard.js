import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { addEvent } from "../eventConstructionDuck";
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

// Math.round(
//   props.ytVideoRef.current.internalPlayer.getCurrentTime() * 100
// ) / 100
export default function EventConstructionCard({ ytVideoRef }) {
  const dispatch = useDispatch();
  const eventConstruction = useSelector((state) => state.eventConstruction);
  const matchId = useSelector((state) => state.matchVideo.match._id);
  const onSubmit = async () => {
    const timestamp = await ytVideoRef.current.internalPlayer.getCurrentTime();

    dispatch(
      addEvent({
        matchId: matchId,
        timestamp: timestamp,
        ...eventConstruction,
      })
    );
  };
  return (
    <Wrapper>
      <div onClick={() => onSubmit()}>
        <h1>ADD</h1>
      </div>
    </Wrapper>
  );
}
