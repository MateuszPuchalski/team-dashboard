import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 0 50px;
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
const margin = { top: 20, right: 15, bottom: 30, left: 40 };
const width = 500;
const height = 300;
const goalOuterRecWidth = 318;
const goalOuterRecHeight = 208;
const goalInnerRecWidth = 300;
const goalInnerRecHeight = 200;
const zAxis = d3.scaleLinear().domain([0, 3]).range([height, 0]);
const yAxis = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);

export default function GoalChartD3Declarative() {
  const svgRef = useRef();
  const [playerId, setPlayerId] = useState("5e3606a51dba6b0ac451eb42");
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);

  const [point, setPoint] = useState({});
  const [filteredThrows, setFilteredThrows] = useState([]);

  useEffect(() => {
    const filtered = throws.filter((item) => {
      return (
        item.throw.endLocation[0].y < point.y + 0.5 &&
        item.throw.endLocation[0].y > point.y - 0.5 &&
        item.throw.endLocation[0].z < point.z + 0.5 &&
        item.throw.endLocation[0].z > point.z - 0.5
      );
    });
    setFilteredThrows(filtered);
  }, [point]);

  const draw = (data) => {
    const svg = d3.select(svgRef.current);
    svg.on("click", () => {
      const [y, z] = d3.mouse(svgRef.current);

      setPoint({ y: yAxis.invert(y), z: zAxis.invert(z) });
    });

    const circle = svg.selectAll("circle").data(data);

    circle
      .enter()
      .append("circle")
      .merge(circle)
      .attr("cx", (d) => yAxis(d.throw.endLocation[0].y))
      .attr("cy", (d) => zAxis(d.throw.endLocation[0].z))
      .attr("r", 0)
      .transition()
      .attr("r", 9.5)
      .style("fill", "rgb(100,100,1)");

    circle.exit().transition().attr("r", 0).remove();
  };

  useEffect(() => draw(filteredThrows), [filteredThrows]);

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

  return (
    <Wrapper>
      {playerId == "5e3606a51dba6b0ac451eb42" ? (
        <h3>Mateusz</h3>
      ) : (
        <h3>Przemek</h3>
      )}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: "pink" }}
      >
        <g>
          <rect
            width={318}
            height={208}
            fill="white"
            x={width / 2 - 316 / 2}
            y={height - 208}
          />
          <rect
            width={300}
            height={200}
            fill="red"
            x={width / 2 - 300 / 2}
            y={height - 200}
          />
        </g>
      </svg>
      <button
        onClick={() =>
          playerId == "5e3606a51dba6b0ac451eb42"
            ? setPlayerId("5e36cd76afad472cc88b643f")
            : setPlayerId("5e3606a51dba6b0ac451eb42")
        }
      >
        Przemek
      </button>
    </Wrapper>
  );
}
