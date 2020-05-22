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
const width = 500;
const height = 250;
const xAxis = d3.scaleLinear().domain([0, 40]).range([0, width]);
const yAxis = d3.scaleLinear().domain([0, 20]).range([height, 0]);

export default function GoalChartD3Declarative({ playerId, setPoint }) {
  const svgRef = useRef();
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);

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
              event.location &&
              event.throw &&
              event.throw.outcome != "7m" &&
              event.throw.outcome != "Blocked"
          )
        );
      });
  }, [playerId]);

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
      .attr("fill", "rgba(231,111,222,0.5)")
      .attr("stroke", "blue");
    courtMidLine
      .selectAll("path")
      .data([courtMidLineData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "blue");
    sevenLineLeft
      .selectAll("path")
      .data([sevenLineLeftData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "blue");
    sevenLineRight
      .selectAll("path")
      .data([sevenLineRightData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "blue");
    sixLineLeft
      .append("path")
      .attr("d", sixLineLeftData)
      .attr("fill", "rgba(231,111,222,0.5)")
      .attr("stroke", "blue");
    sixLineRight
      .append("path")
      .attr("d", sixLineRightData)
      .attr("fill", "rgba(231,111,222,0.5)")
      .attr("stroke", "blue");
    fourLineLeft
      .selectAll("path")
      .data([fourLineLeftData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "blue");
    fourLineRight
      .selectAll("path")
      .data([fourLineRightData])
      .enter()
      .append("path")
      .attr("d", line)
      .attr("stroke", "blue");
    nineLineLeft
      .append("path")
      .attr("d", nineLineLeftData)
      .attr("fill", "none")
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "blue");
    nineLineRight
      .append("path")
      .attr("d", nineLineRightData)
      .attr("fill", "none")
      .attr("stroke-dasharray", "5,5")
      .attr("stroke", "blue");
  };

  const drawThrowDistribution = (data) => {
    const svg = d3.select(svgRef.current);
    d3.select("#throwLocation").remove();

    const circles = svg.append("g").attr("id", "throwLocation");
    const circle = circles.selectAll("circle").data(data, (d) => d._id);
    // const circle = svg.selectAll("circle").data(data, (d) => d._id);

    circle
      .enter()
      .append("circle")
      .attr("cx", (d) => xAxis(d.location[0].x) || xAxis(d.location.x))
      .attr("cy", (d) => yAxis(d.location[0].y) || yAxis(d.location.y))
      .attr("r", 0)
      .transition()
      .duration(300)
      .attr("r", 2)
      .style("fill", "rgba(0,0,255,1)");
    circle.exit().transition().duration(100).attr("r", 0).remove();
  };

  const searchCircle = () => {
    const svg = d3.select(svgRef.current);
    const searchCircle = svg
      .append("g")
      .attr("id", "searchCircle")
      .append("circle")
      .attr("r", xAxis(2))
      .attr("fill", "rgba(231,111,222,0.5)");

    svg.on("mousemove", () => {
      const [x, y] = d3.mouse(svgRef.current);
      searchCircle.attr("cx", x).attr("cy", y);
      setPoint({ x: xAxis.invert(x), y: yAxis.invert(y) });
    });
  };

  useEffect(() => {
    drawCourt();
    searchCircle();
  }, []);

  useEffect(() => {
    drawThrowDistribution(throws);
  }, [throws]);

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
