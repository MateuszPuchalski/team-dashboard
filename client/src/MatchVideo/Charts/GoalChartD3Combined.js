import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Range = styled.div`
  width: 500px;
  input {
    width: 100%;
  }
`;

export default function GoalChartD3Declarative({ throws }) {
  const svgRef = useRef();
  const [contoursToggle, toggleContours] = useState(true);
  const [bandwidth, setBandwidth] = useState(20);
  const [weight, setWeight] = useState(10);
  const [thresholds, setThresholds] = useState(24);

  const width = 500;
  const height = width * 0.6;

  const zAxis = d3.scaleLinear().domain([0, 3]).range([height, 0]);
  const yDataScale = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);
  const yAxis = d3.scaleLinear().domain([0, 5]).range([0, width]);

  const drawThrowPoints = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("circle").remove();
    if (!contoursToggle) {
      const circle = svg.selectAll("circle").data(data, (d) => d._id);

      circle
        .enter()
        .append("circle")
        .attr("cx", (d) => yDataScale(d.throw.endLocation[0].y))
        .attr("cy", (d) => zAxis(d.throw.endLocation[0].z))
        .attr("r", 0)
        .transition()
        .duration(300)
        .attr("r", yAxis(0.085))
        .style("fill", "rgba(0,0,255,0.8)");

      circle.exit().transition().duration(100).attr("r", 0).remove();
    }
  };

  const drawContours = (data) => {
    const svg = d3.select(svgRef.current);
    svg.select("#throwContour").remove();
    if (contoursToggle) {
      const contours = d3
        .contourDensity()
        .x((d) => yDataScale(d.throw.endLocation[0].y))
        .y((d) => zAxis(d.throw.endLocation[0].z))
        .size([width, height])
        .thresholds(thresholds)
        .bandwidth(bandwidth)(data);

      const color = d3
        .scaleLinear()
        .domain(d3.extent(contours, (d) => d.value))
        .interpolate(function () {
          return d3.interpolateInferno;
        });

      svg
        .append("g")
        .attr("id", "throwContour")
        .attr("stroke", "none")
        // .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(contours)
        .enter()
        .append("path")
        // .attr("stroke-width", (d, i) => (i % 5 ? 0.25 : 1))
        .attr("d", d3.geoPath())
        .attr("fill", (d) => color(d.value))
        .attr("fill-opacity", 0.2);
    }
  };

  useEffect(() => drawThrowPoints(throws), [throws, contoursToggle]);
  useEffect(() => {
    drawContours(throws);
  }, [throws, bandwidth, thresholds, contoursToggle, weight]);

  return (
    <Wrapper>
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
      <button
        style={contoursToggle ? { color: "green" } : { color: "red" }}
        onClick={() => toggleContours(!contoursToggle)}
      >
        CONTOURS
      </button>
      {/* <Range>
        Bandwidth: {bandwidth}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={bandwidth}
          onChange={(e) => {
            setBandwidth(e.target.value);
          }}
        />
        Weight: {weight}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        Thresholds: {thresholds}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={thresholds}
          onChange={(e) => {
            setThresholds(e.target.value);
          }}
        />
      </Range> */}
    </Wrapper>
  );
}
