import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 0 50px;
`;

const Range = styled.div`
  width: 500px;
  input {
    width: 100%;
  }
`;

const generateGoalData = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      y: d3.randomUniform(7.5, 12.5)(),
      z: d3.randomUniform(0, 3)(),
    });
  }
  return data;
};
// przemek: 5e36cd76afad472cc88b643f

const width = 500;
const height = 300;

const zAxis = d3.scaleLinear().domain([0, 3]).range([height, 0]);
const yAxis = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);

export default function GoalChartD3Declarative({ playerId, point }) {
  const svgRef = useRef();
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);
  const [bandwidth, setBandwidth] = useState(20);
  const [thresholds, setThresholds] = useState(20);
  const [filteredThrows, setFilteredThrows] = useState([]);

  useEffect(() => {
    setEvents([]);
    fetch(`/api/events/player/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setThrows(
          data.filter(
            (event) =>
              event.type == "Throw" &&
              event.throw &&
              event.throw.outcome != "7m" &&
              event.throw.outcome != "Blocked"
          )
        );
      });
  }, [playerId]);

  useEffect(() => {
    const filtered = throws.filter((item) => {
      return (
        item.location[0].x < point.x + 2 &&
        item.location[0].x > point.x - 2 &&
        item.location[0].y < point.y + 2 &&
        item.location[0].y > point.y - 2
      );
    });
    setFilteredThrows(filtered);
  }, [point]);

  const draw = (data) => {
    const svg = d3.select(svgRef.current);

    const circle = svg.selectAll("circle").data(data, (d) => d._id);

    circle
      .enter()
      .append("circle")
      .attr("cx", (d) => yAxis(d.throw.endLocation[0].y))
      .attr("cy", (d) => zAxis(d.throw.endLocation[0].z))
      .attr("r", 0)
      .transition()
      .duration(300)
      .attr("r", 9.5)
      .style("fill", "rgba(0,0,255,0.8)");

    circle.exit().transition().duration(100).attr("r", 0).remove();
  };

  const drawThrowDistributionContours = (data) => {
    const svg = d3.select(svgRef.current);
    d3.select("#throwContour").remove();

    const contours = d3
      .contourDensity()
      .x((d) => yAxis(d.throw.endLocation[0].y))
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
  };

  useEffect(() => draw(throws), [throws]);
  useEffect(() => drawThrowDistributionContours(throws), [
    throws,
    bandwidth,
    thresholds,
  ]);

  return (
    <Wrapper>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: "rgba(231,111,222,0.5)" }}
      >
        <g>
          <rect
            width={318}
            height={208}
            fill="rgba(231,111,222,0.5)"
            x={width / 2 - 316 / 2}
            y={height - 208}
          />
          <rect
            width={300}
            height={200}
            fill="rgba(231,111,222,0.5)"
            x={width / 2 - 300 / 2}
            y={height - 200}
          />
        </g>
      </svg>
      <Range>
        Bandwidth
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
        Thresholds
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
      </Range>
    </Wrapper>
  );
}
