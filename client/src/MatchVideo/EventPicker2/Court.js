import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { SET_LOCATION } from "./constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;
export default function Court({ state, parent, dispatch }) {
  const svgRef = useRef();

  const [width, height] = [parent.width - 50, (parent.width - 50) / 2];

  const xAxis = d3.scaleLinear().domain([0, 40]).range([0, width]);
  const yAxis = d3.scaleLinear().domain([0, 20]).range([height, 0]);

  const drawCourt = () => {
    const svg = d3.select(svgRef.current);

    const line = d3
      .line()
      .x((d) => xAxis(d.x))
      .y((d) => yAxis(d.y));

    const courtOutlineData = [
      { x: 0, y: 0 },
      { x: 40, y: 0 },
      { x: 40, y: 20 },
      { x: 0, y: 20 },
      { x: 0, y: 0 },
    ];
    const courtMidLineData = [
      { x: 20, y: 0 },
      { x: 20, y: 20 },
    ];
    const sevenLineLeftData = [
      { x: 7, y: 9.5 },
      { x: 7, y: 10.5 },
    ];
    const sevenLineRightData = [
      { x: 33, y: 9.5 },
      { x: 33, y: 10.5 },
    ];
    const fourLineLeftData = [
      { x: 4, y: 9.75 },
      { x: 4, y: 10.25 },
    ];
    const fourLineRightData = [
      { x: 36, y: 9.75 },
      { x: 36, y: 10.25 },
    ];

    const sixLineLeftData = d3.path();
    sixLineLeftData.moveTo(0, yAxis(2.5));
    sixLineLeftData.quadraticCurveTo(
      xAxis(6),
      yAxis(2.5),
      xAxis(6),
      yAxis(8.5)
    );
    sixLineLeftData.lineTo(xAxis(6), yAxis(11.5));
    sixLineLeftData.quadraticCurveTo(
      xAxis(6),
      yAxis(17.5),
      xAxis(0),
      yAxis(17.5)
    );

    const sixLineRightData = d3.path();
    sixLineRightData.moveTo(xAxis(40), yAxis(2.5));
    sixLineRightData.quadraticCurveTo(
      xAxis(34),
      yAxis(2.5),
      xAxis(34),
      yAxis(8.5)
    );
    sixLineRightData.lineTo(xAxis(34), yAxis(11.5));
    sixLineRightData.quadraticCurveTo(
      xAxis(34),
      yAxis(17.5),
      xAxis(40),
      yAxis(17.5)
    );

    const nineLineLeftData = d3.path();
    nineLineLeftData.moveTo(xAxis(3), yAxis(0));
    nineLineLeftData.quadraticCurveTo(xAxis(9), yAxis(0), xAxis(9), yAxis(8.5));
    nineLineLeftData.lineTo(xAxis(9), yAxis(11.5));
    nineLineLeftData.quadraticCurveTo(xAxis(9), yAxis(20), xAxis(3), yAxis(20));

    const nineLineRightData = d3.path();
    nineLineRightData.moveTo(xAxis(37), yAxis(0));
    nineLineRightData.quadraticCurveTo(
      xAxis(31),
      yAxis(0),
      xAxis(31),
      yAxis(8.5)
    );
    nineLineRightData.lineTo(xAxis(31), yAxis(11.5));
    nineLineRightData.quadraticCurveTo(
      xAxis(31),
      yAxis(20),
      xAxis(37),
      yAxis(20)
    );

    const court = svg.append("g").attr("id", "court");
    const courtOutline = court.append("g").attr("id", "courtOutline");
    const courtMidLine = court.append("g").attr("id", "courtMidLine");
    const sevenLineLeft = court.append("g").attr("id", "sevenLineLeft");
    const sevenLineRight = court.append("g").attr("id", "sevenLineRight");
    const sixLineLeft = court.append("g").attr("id", "sixLineLeft");
    const sixLineRight = court.append("g").attr("id", "sixLineRight");
    const fourLineLeft = court.append("g").attr("id", "fourLineLeft");
    const fourLineRight = court.append("g").attr("id", "fourLineRight");
    const nineLineLeft = court.append("g").attr("id", "nineLineLeft");
    const nineLineRight = court.append("g").attr("id", "nineLineRight");

    courtOutline
      .selectAll("path")
      .data([courtOutlineData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("fill", "rgb(218, 68, 83)")
      .attr("stroke", "white");
    courtMidLine
      .selectAll("path")
      .data([courtMidLineData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "white");
    sevenLineLeft
      .selectAll("path")
      .data([sevenLineLeftData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "white");
    sevenLineRight
      .selectAll("path")
      .data([sevenLineRightData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "white");
    sixLineLeft
      .append("path")
      .attr("d", sixLineLeftData)
      .attr("fill", "rgb(137, 33, 107)")
      .attr("stroke", "white");
    sixLineRight
      .append("path")
      .attr("d", sixLineRightData)
      .attr("fill", "rgb(137, 33, 107)")
      .attr("stroke", "white");
    fourLineLeft
      .selectAll("path")
      .data([fourLineLeftData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "white");
    fourLineRight
      .selectAll("path")
      .data([fourLineRightData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "white");
    nineLineLeft
      .append("path")
      .attr("d", nineLineLeftData)
      .attr("fill", "none")
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "white");
    nineLineRight
      .append("path")
      .attr("d", nineLineRightData)
      .attr("fill", "none")
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "white");
  };
  useEffect(() => {
    drawCourt();
  }, [width, height]);

  const goalCordsOnClick = (svgRef) => {
    const svg = d3.select(svgRef.current);
    svg.on("click", () => {
      const cords = d3.mouse(svgRef.current);
      dispatch({
        type: SET_LOCATION,
        paylode: [
          Math.round(xAxis.invert(cords[0]) * 100) / 100,
          Math.round(yAxis.invert(cords[1]) * 100) / 100,
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
    if (svgRef.current && state.location) {
      const svg = d3.select(svgRef.current);
      svg
        .append("circle")
        .attr("r", 5)
        .attr("cx", xAxis(state.location[0]))
        .attr("cy", yAxis(state.location[1]));
      return () => svg.select("circle").remove();
    }
  }, [state]);
  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <svg
        ref={svgRef}
        width={xAxis(40)}
        height={yAxis(0)}
        style={{ background: "pink" }}
      ></svg>
    </Wrapper>
  );
}
