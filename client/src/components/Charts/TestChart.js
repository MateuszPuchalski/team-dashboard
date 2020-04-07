import React, { useState, useEffect, useRef } from "react";
import RadarChart from "./radarChart";
import * as d3 from "d3";
import styled from "styled-components";

const borderRadius = "5px";

const Wrapper = styled.div`
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  border-radius: ${borderRadius};
  margin: 1rem;

  /* border: 1px solid black; */
  /* background: #000928; */
`;
const data = [
  { axis: "Speed", value: 1 },
  { axis: "Strength", value: 0.7 },
  { axis: "Agility", value: 0.1 },
  { axis: "Wisdom", value: 0.3 },
  { axis: "Dexterity", value: 0.5 },
  { axis: "Constitution", value: 0.7 },
  { axis: "Athletics", value: 0.2 },
];
const randomData = [4, 5, 7, 1, 3];

const rScale = d3.scaleLinear().domain([0, 1]).range([0, 300]);
export default function TestChart() {
  const ref = useRef();

  function renderChart(id, data, options) {
    let cfg = {
      w: 500,
      h: 500,
      levels: 5,
    };
    const angleSlice = (Math.PI * 2) / data.length;
    const svg = d3
      .select(id)
      .append("svg")
      .attr("width", cfg.w + 200)
      .attr("height", cfg.h + 200);
    // .style("background", "red");
    const g = svg
      .append("g")
      .attr("transform", `translate(${cfg.w / 2 + 100}, ${cfg.h / 2 + 100})`);
    const axisGrid = g.append("g").attr("class", "axisWrapper");

    const polygon = axisGrid
      .append("polygon")
      .attr(
        "points",
        data
          .map((ele, i) =>
            [
              (cfg.w / 2) * Math.cos(angleSlice * i - Math.PI / 2),
              (cfg.h / 2) * Math.sin(angleSlice * i - Math.PI / 2),
            ].join(",")
          )
          .join(" ")
      )
      .style("stroke", "grey")
      .style("fill", "grey")
      .style("fill-opacity", 0.05);

    const filter = g.append("defs").append("filter").attr("id", "glow");
    const feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    const feMergeNode_1 = feMerge
      .append("feMergeNode")
      .attr("in", "coloredBlur");
    const feMergeNode_2 = feMerge
      .append("feMergeNode")
      .attr("in", "SourceGraphic");

    const polygonLevels = axisGrid
      .selectAll(".levels")
      .data(d3.range(1, cfg.levels + 1))
      .enter()
      .append("polygon")
      .attr("points", (d) => {
        console.log(d);
        return data
          .map((ele, i) =>
            [
              (((cfg.w / 2) * Math.cos(angleSlice * i - Math.PI / 2)) /
                cfg.levels) *
                d,
              (((cfg.h / 2) * Math.sin(angleSlice * i - Math.PI / 2)) /
                cfg.levels) *
                d,
            ].join(",")
          )
          .join(" ");
      })
      .style("stroke", "grey")
      .style("fill", "grey")
      .style("fill-opacity", 0.05)
      .style("filter", "url(#glow)");

    const axis = axisGrid
      .selectAll(".axis")
      .data(data.map((i) => i.axis))
      .enter()
      .append("g")
      .attr("class", "axis");
    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (d, i) => 1.1 * (cfg.w / 2) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y2",
        (d, i) => 1.1 * (cfg.h / 2) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("class", "line")
      .attr("stroke", "grey")
      .attr("stroke-width", "2px")
      .style("stroke-dasharray", "3, 3");
    axis
      .append("text")
      .attr("class", "legend")
      .attr("text-anchor", "middle")
      .attr(
        "x",
        (d, i) => ((cfg.w + 80) / 2) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y",
        (d, i) => ((cfg.h + 80) / 2) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .style("stroke", "white")
      .text((d) => d);

    const polygon2 = axisGrid
      .append("polygon")
      .attr(
        "points",
        data
          .map((ele, i) => {
            return [
              ele.value * (cfg.w / 2) * Math.cos(angleSlice * i - Math.PI / 2),
              ele.value * (cfg.h / 2) * Math.sin(angleSlice * i - Math.PI / 2),
            ].join(",");
          })
          .join(" ")
      )
      .style("stroke", "#ff7f00")
      .style("stroke-width", "2px")
      .style("fill", "#ff7f00")
      .style("fill-opacity", 0.7);
  }

  useEffect(() => {
    console.log(ref);
    renderChart(ref.current, data);
  }, []);

  return <Wrapper ref={ref}></Wrapper>;
}
