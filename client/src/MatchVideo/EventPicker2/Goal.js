import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { SET_END_LOCATION } from "./constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0 10px;
`;

export default function Goal({ state, parent, dispatch }) {
  const svgRef = useRef();

  const [width, height] = [parent.width - 50, (parent.width - 50) * 0.6];
  const zAxis = d3.scaleLinear().domain([0, 3]).range([height, 0]);
  const yDataScale = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);
  const yAxis = d3.scaleLinear().domain([0, 5]).range([0, width]);

  const goalCordsOnClick = (svgRef) => {
    const svg = d3.select(svgRef.current);
    svg.on("click", () => {
      const cords = d3.mouse(svgRef.current);
      dispatch({
        type: SET_END_LOCATION,
        paylode: [
          Math.round(yDataScale.invert(cords[0]) * 100) / 100,
          Math.round(zAxis.invert(cords[1]) * 100) / 100,
        ],
      });
    });
  };

  useEffect(() => {
    if (svgRef.current) {
      goalCordsOnClick(svgRef);
    }
  }, [svgRef.current]);

  useEffect(() => {
    if (svgRef.current && state.throw?.endLocation) {
      const svg = d3.select(svgRef.current);
      svg
        .append("circle")
        .attr("r", 5)
        .attr("cx", yDataScale(state.throw.endLocation[0]))
        .attr("cy", zAxis(state.throw.endLocation[1]));
      return () => svg.select("circle").remove();
    }
  }, [state]);

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          background: "whitesmoke",
        }}
      >
        <g>
          <rect
            width={yAxis(3.16)}
            height={zAxis(0)}
            fill="rgb(218, 68, 83)"
            x={width / 2 - yAxis(3.16) / 2}
            y={zAxis(2.08)}
          />
          <rect
            width={yAxis(3)}
            height={zAxis(1)}
            fill="rgba(255,255,255,0.1)"
            x={width / 2 - yAxis(3) / 2}
            y={zAxis(2)}
          />
        </g>
      </svg>
    </Wrapper>
  );
}
