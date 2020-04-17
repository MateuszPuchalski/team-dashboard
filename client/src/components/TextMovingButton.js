import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";

const MovingButton = styled.button`
  color: #fff;

  font-weight: bold;
  background: rgb(0, 180, 255);
  background: radial-gradient(
    circle,
    rgba(0, 180, 255, 1) 50%,
    rgba(0, 160, 255, 1) 100%
  );
  margin-top: 15px;
  text-transform: uppercase;
  transition: box-shadow 500ms, font-size 500ms;
  border: none;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  &:hover {
    cursor: pointer;
  }
`;
export default function TextMovingButton({ text }) {
  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0],
  }));
  return (
    <MovingButton
      onMouseMove={(evt) => {
        const { clientX, clientY } = evt;
        const { left, top, width, height } = evt.target.getBoundingClientRect();
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;
        console.log({ evt: evt.target.getBoundingClientRect() });
        set({ xy: [x, y] });
      }}
      onMouseLeave={() => set({ xy: [0, 0] })}
    >
      <animated.span
        style={{
          transform: xy.interpolate(
            (x, y) => `translate(${x / 10}px,${y / 10}px)`
          ),
        }}
      >
        {text}
      </animated.span>
    </MovingButton>
  );
}
