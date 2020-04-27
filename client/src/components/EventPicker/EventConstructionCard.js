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
`;

export default function EventConstructionCard() {
  const event = useSelector((state) => state.eventShape.event);
  const eventType = useSelector((state) => state.eventShape.eventType);
  const player = useSelector((state) => state.eventShape.player);
  console.log(eventType);
  return (
    <Wrapper>
      <h3>{event}</h3>
      <h4>{eventType}</h4>
      <h3>{player}</h3>
    </Wrapper>
  );
}
