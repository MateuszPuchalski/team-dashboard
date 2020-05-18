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
      x: d3.randomUniform(0, 40)(),
      y: d3.randomUniform(0, 20)(),
    });
  }
  return data;
};
// przemek: 5e36cd76afad472cc88b643f
const margin = { top: 20, right: 15, bottom: 30, left: 40 };
const width = 500;
const height = 250;
const goalOuterRecWidth = 318;
const goalOuterRecHeight = 208;
const goalInnerRecWidth = 300;
const goalInnerRecHeight = 200;
const xAxis = d3.scaleLinear().domain([0, 40]).range([0, width]);
const yAxis = d3.scaleLinear().domain([0, 20]).range([height, 0]);

export default function GoalChartD3Declarative() {
  const svgRef = useRef();
  const [playerId, setPlayerId] = useState("5e3606a51dba6b0ac451eb42");
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);

  const [point, setPoint] = useState({});
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
        item.throw.endLocation[0].y < point.y + 0.5 &&
        item.throw.endLocation[0].y > point.y - 0.5 &&
        item.throw.endLocation[0].z < point.z + 0.5 &&
        item.throw.endLocation[0].z > point.z - 0.5
      );
    });
    setFilteredThrows(filtered);
  }, [point]);

  const draw = () => {
    const svg = d3.select(svgRef.current);
    // svg.on("mousemove", () => {
    //   const [x, y] = d3.mouse(svgRef.current);
    //   setPoint({ y: yAxis.invert(y), x: xAxis.invert(x) });
    // });

    // const circle = svg.selectAll("circle").data(data, (d) => d._id);

    // circle
    //   .enter()
    //   .append("circle")

    //   .attr("cx", (d) => xAxis(d.location[0].x))
    //   .attr("cy", (d) => yAxis(d.location[0].y))
    //   .attr("r", 0)
    //   .transition()
    //   .duration(300)
    //   .attr("r", 9.5)
    //   .style("fill", "rgb(100,100,1)");
    const data = [
      { x: 0, y: 0 },
      { x: 500, y: 0 },
      { x: 500, y: 250 },
    ];

    const group = svg.append("g");

    // circle.exit().transition().duration(100).attr("r", 0).remove();
    const line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);
    line.closePath();

    group
      .selectAll("path")
      .data([data])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue");
  };
  useEffect(() => draw(), []);

  return (
    <Wrapper>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: "pink" }}
      ></svg>
    </Wrapper>
  );
}
