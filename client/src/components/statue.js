import { useSpring, animated } from "react-spring";
import React, { useState, useEffect } from "react";

export default function Statue(props) {
  const [nr, setNr] = useState(props.nr);
  const opacity = useSpring({ opacity: 1, from: { opacity: 0 } });
  const number = useSpring({
    number: props.nr,
    config: { precision: 0.1 },
    from: { number: nr }
  });
  return (
    <div className="statue">
      <animated.h1 style={opacity}>{number.number}</animated.h1>
      <img
        src={
          process.env.PUBLIC_URL +
          `/statues/${props.name}${props.surname}Statue-edit2.webp`
        }
        alt=""
      />
    </div>
  );
}
