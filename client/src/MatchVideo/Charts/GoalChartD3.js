import React, { useEffect } from "react";
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
export default function GoalChartD3() {
  const [loading, matEvents] = useEvents({
    playerId: "5e3606a51dba6b0ac451eb42",
  });
  let matThrows = [];

  const margin = { top: 20, right: 15, bottom: 30, left: 40 };
  const width = 500;
  const height = 300;
  const goalOuterRecWidth = 318;
  const goalOuterRecHeight = 208;
  const goalInnerRecWidth = 300;
  const goalInnerRecHeight = 200;
  const z = d3.scaleLinear().domain([0, 3]).range([height, 0]);
  const y = d3.scaleLinear().domain([7.5, 12.5]).range([0, width]);

  const svg = d3.select("#goal");
  svg.attr("viewBox", [-25, -25, width + 50, height + 50]);
  svg.attr("width", width).attr("height", height).style("background", "pink");
  svg.append("g").call(d3.axisLeft(z));
  // .attr("transform", `translate(${margin.left},0)`);
  svg
    .append("g")
    .call(d3.axisBottom(y))
    .attr("transform", `translate(0,${height})`);

  const goal = svg.append("g");
  goal
    .append("rect")
    .attr("fill", "white")
    .attr("width", 316)
    .attr("height", 208)
    .attr("x", width / 2 - 316 / 2)
    .attr("y", height - 208);
  goal
    .append("rect")
    .attr("fill", "red")
    .attr("width", 300)
    .attr("height", 200)
    .attr("x", width / 2 - 300 / 2)
    .attr("y", height - 200);

  useEffect(() => {
    matThrows = matEvents.filter(
      (event) =>
        event.type == "Throw" && event.throw && event.throw.outcome != "7m"
    );
  }, [matEvents]);

  useEffect(() => {
    const circles = svg.append("g");
    const circle = circles
      .selectAll("circle")
      .data(matThrows)
      .join("circle")
      .attr("cx", (d) => y(d.throw.endLocation[0].y))
      .attr("cy", (d) => z(d.throw.endLocation[0].z))
      .attr("r", 9.5)
      .style("fill", "green");
    circle.exit().remove();
  }, [matThrows]);
  return (
    <Wrapper>
      <svg
        id="goal"
        width={width}
        height={height}
        style={{ background: "pink" }}
      ></svg>
    </Wrapper>
  );
}
