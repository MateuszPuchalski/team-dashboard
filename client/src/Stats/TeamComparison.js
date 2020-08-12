import React, { useRef, useEffect, useState } from "react";
import useClientRect from "../Hooks/useClientRect";
import useMatchStats from "./useMatchStats";
import * as d3 from "d3";

export default function TeamComparison({ matchId }) {
  const [rect, ref] = useClientRect();
  const [loading, error, matchInfo] = useMatchStats(matchId);
  const svgRef = useRef();
  useEffect(() => {
    if (rect && matchInfo) {
      const svg = d3.select(svgRef.current);
      svg.attr("viewBox", [0, 0, rect.width, 1000]);
      comparisonBar(
        svg,
        matchInfo.homeTeam.throws.total,
        matchInfo.awayTeam.throws.total,
        "Throws",
        rect
      );
      comparisonBar(
        svg,
        matchInfo.homeTeam.turnovers.total,
        matchInfo.awayTeam.turnovers.total,
        "Turnovers",
        rect
      );
      comparisonBar(
        svg,
        matchInfo.homeTeam.punishments.total,
        matchInfo.awayTeam.punishments.total,
        "Punishments",
        rect
      );
    }
  }, [rect]);
  useEffect(() => {
    if (matchInfo) {
      console.log({ matchInfo: matchInfo });
    }
  }, [matchInfo]);
  return (
    <div ref={ref} style={{ background: "rgba(0,0,0,0.1)" }}>
      <svg ref={svgRef} />
    </div>
  );
}

function comparisonBar(svg, a, b, title, parentNode) {
  const total = a + b;
  const options = { bandWidth: 25 };
  const margin = {
    top: 20,
    right: 80,
    bot: 20,
    left: 80,
  };
  const x = d3.scaleLinear(
    [0, total],
    [margin.left, parentNode.width - margin.right]
  );
  const barWidthScale = d3.scaleLinear(
    [0, total],
    [0, parentNode.width / 2 - margin.right]
  );
  console.log({ total: x(total), a: x(a) });
  const numberOfBars = d3.selectAll("g").nodes().length;
  const rects = svg.append("g");
  //#region bars
  rects.attr("style", `transform: translateY(${50 * (numberOfBars + 1)}px)`);
  rects
    .append("rect")
    .attr("width", barWidthScale(a))
    .attr("height", 15)
    .attr("x", x(total / 2) - barWidthScale(a))
    .attr("y", options.bandWidth)
    .attr("fill", "#17ea48"); //green

  rects
    .append("rect")
    .attr("width", barWidthScale(total))
    .attr("height", 15)
    .attr("x", x(0))
    .attr("y", options.bandWidth)
    .attr("fill", "rgba(0,0,0,0.1)");

  rects
    .append("rect")
    .attr("width", barWidthScale(b))
    .attr("height", 15)
    .attr("x", x(total / 2))
    .attr("y", options.bandWidth)
    .attr("fill", "#ea2517"); //red
  rects
    .append("rect")
    .attr("width", barWidthScale(total))
    .attr("height", 15)
    .attr("x", x(total / 2))
    .attr("y", options.bandWidth)
    .attr("fill", "rgba(0,0,0,0.1)");
  //#endregion
  rects
    .append("text")
    .style("text-anchor", "middle")
    .attr("x", x(total / 2))
    .attr("y", 15)
    .text(title)
    .attr("font-size", 20)
    .attr("font-weight", "bold");
  rects
    .append("text")
    .attr("x", x(0) - 50)
    .attr("y", 38)
    .text(`${a}/${total}`);
  rects
    .append("text")
    .attr("x", x(total) + 10)
    .attr("y", 38)
    .text(`${b}/${total}`);
}
