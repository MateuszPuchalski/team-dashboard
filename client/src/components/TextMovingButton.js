import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";
//TODO;
//  Add disabled version
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
  span {
    img {
      @keyframes infiniteRotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      transform: rotate(20deg);
      height: 1.5rem;
      animation: infiniteRotate 1s linear infinite;
    }
  }
`;
export default function TextMovingButton({ text, loading }) {
  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 1, tension: 180, friction: 8 },
  }));

  return (
    <MovingButton
      onMouseMove={(evt) => {
        const { clientX, clientY } = evt;
        const { left, top, width, height } = evt.target.getBoundingClientRect();
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;
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
        {loading ? (
          <animated.img src={process.env.PUBLIC_URL + "/load.svg"} />
        ) : (
          text
        )}
      </animated.span>
    </MovingButton>
  );
}
