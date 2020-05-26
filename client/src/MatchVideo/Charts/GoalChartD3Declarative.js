import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import useEvents from "../../Hooks/useEvents";
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
const z = d3.scaleLinear().domain([0, 3]).range([height, 0]);
const y = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);

export default function GoalChartD3Declarative() {
  const [playerId, setPlayerId] = useState("5e3606a51dba6b0ac451eb42");
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);

  // const svg = d3.select("#goal2");
  // svg.attr("viewBox", [-25, -25, width + 50, height + 50]);
  // svg.attr("width", width).attr("height", height).style("background", "pink");

  // svg.append("g").call(d3.axisLeft(z));
  // svg
  //   .append("g")
  //   .call(d3.axisBottom(y))
  //   .attr("transform", `translate(0,${height})`);

  useEffect(() => {
    setEvents([]);
    fetch(`/api/events/player/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        id="goal2"
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
        <g>
          {throws.map((item) => (
            <circle
              cx={y(item.throw.endLocation[0].y)}
              cy={z(item.throw.endLocation[0].z)}
              r={9.5}
              style={{ fill: "blue" }}
            />
          ))}
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
