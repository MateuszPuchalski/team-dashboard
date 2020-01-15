import { useSpring, animated } from "react-spring";
import React, { useState, useEffect } from "react";

import styled from "styled-components";

// zmienic jak bede łączyć w player info
const Wrapper = styled.div`
  grid-row: 2 / 12;
  grid-column: 5 / 9;
  display: grid;
  position: relative;
`;

const Img = styled.img`
  /* width: 100%; */
  height: 200%;
  justify-self: center;
  z-index: 2;
`;

const ClubName = styled.img`
  /* opacity: 0.5; */
  width: 120%;
  position: absolute;
  justify-self: center;
  align-self: start;
  margin: 0;
  margin-top: 5vh;
  z-index: 1;
`;

const Number = styled.h1`
  font-size: 7em;
  position: absolute;
  margin-left: 10%;
  margin-top: 30%;
  color: rgba(255, 255, 255);
  z-index: 3;
  .hash {
    font-size: 0.3em;
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
      <ClubName
        src={process.env.PUBLIC_URL + `/fadebestiosnapis.png`}
        id="herb"
        alt="herb"
      />
      <Number>
        <span className="hash">#</span>
        {props.nr}
      </Number>
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
