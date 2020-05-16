import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
`;

const generateGoalData = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({ x: d3.randomUniform(10)(), y: d3.randomUniform(10)() });
  }
  return data;
};

export default function GoalChartD3() {
  const ref = useRef();
  console.log(ref);
  console.log(generateGoalData(10));
  const margin = { top: 20, right: 10, bottom: 30, left: 40 };
  const width = 500;
  const height = 500;
  const x = d3
    .scaleLinear()
    .domain([0, 10])
    .range([margin.left, width - margin.right]);
  const y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

  useEffect(() => {
    if (ref.current) {
      const div = d3.select(ref.current);

      const svg = div
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "pink")
        .on("click", (e) => console.log(e));

      const dot = svg.selectAll("g").data(generateGoalData(50)).join("g");

      dot
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", "5")
        .attr("fill", "whitesmoke");

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, []);
  return <Wrapper ref={ref}></Wrapper>;
}
