import { useSpring, animated } from "react-spring";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// zmienic jak bede łączyć w player info
const Wrapper = styled.div`
  grid-row: 2 / 13;
  grid-column: 2 / 6;
  display: grid;

  &:hover {
    background: pink;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  justify-self: center;
  &:hover {
    background: pink;
  }
`;

export default function Statue(props) {
  const [nr, setNr] = useState(props.nr);
  const opacity = useSpring({ opacity: 1, from: { opacity: 0 } });
  const number = useSpring({
    number: props.nr,
    config: { precision: 0.1 },
    from: { number: nr }
  });
  return (
    <Wrapper>
      <Img
        src={
          process.env.PUBLIC_URL +
          `/statues/${props.name}${props.surname}Statue-edit2.webp`
        }
        alt=""
      />
    </Wrapper>
  );
}
