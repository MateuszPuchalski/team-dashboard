import React, { useState, useEffect } from "react";

import {
  ReferenceDot,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import styled from "styled-components";

const Court = styled.div`
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
`;

export default function AdminCourtChart({ scale }) {
  const [throwCords, setThrowCords] = useState([{ x: 15, y: 5 }]);

  useEffect(() => {
    console.log({ throwCords: throwCords });
  }, [throwCords]);

  const getCords = e => {
    setThrowCords([
      ...throwCords,
      {
        x: Math.round(e.xValue * 100) / 100,
        y: Math.round(e.yValue * 100) / 100
      }
    ]);
  };

  return (
    <Court>
      <ScatterChart
        onClick={getCords}
        width={40 * scale}
        height={20 * scale}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        {/* LEFt SIDE  */}
        <ReferenceDot
          // 9 meter line
          x={0}
          y={8.5}
          r={9 * scale}
          fillOpacity={1}
          fill="white"
          stroke="white"
        />
        <ReferenceDot
          // 9 meter line
          x={0}
          y={11.5}
          r={9 * scale}
          fillOpacity={1}
          fill="white"
          stroke="white"
        />
        <ReferenceArea
          // 9 meter fill up
          x1={0}
          x2={9}
          y1={8.5}
          y2={20 - 8.5}
          fill="white"
          fillOpacity={1}
          stroke="white"
        />
        <ReferenceDot
          // 6 mater line
          x={0}
          y={8.5}
          r={6 * scale}
          fillOpacity={1}
          fill="black"
          stroke="black"
        />
        <ReferenceDot
          // 6 mater line
          x={0}
          y={11.5}
          r={6 * scale}
          fillOpacity={1}
          fill="black"
          stroke="black"
        />
        <ReferenceArea
          // 6 line square fill up
          x1={0}
          x2={6}
          y1={8.5}
          y2={20 - 8.5}
          fill="black"
          fillOpacity={1}
          stroke="black"
        />

        {/* Right Side */}
        <ReferenceDot
          // 9 meter line
          x={40}
          y={8.5}
          r={9 * scale}
          fillOpacity={1}
          fill="white"
          stroke="white"
        />
        <ReferenceDot
          // 9 meter line
          x={40}
          y={11.5}
          r={9 * scale}
          fillOpacity={1}
          fill="white"
          stroke="white"
        />
        <ReferenceArea
          // 9 meter fill up
          x1={40}
          x2={40 - 9}
          y1={8.5}
          y2={20 - 8.5}
          fill="white"
          fillOpacity={1}
          stroke="white"
        />
        <ReferenceDot
          // 6 mater line
          x={40}
          y={8.5}
          r={6 * scale}
          fillOpacity={1}
          fill="black"
          stroke="black"
        />
        <ReferenceDot
          // 6 mater line
          x={40}
          y={11.5}
          r={6 * scale}
          fillOpacity={1}
          fill="black"
          stroke="black"
        />
        <ReferenceArea
          // 6 line square fill up
          x1={40}
          x2={40 - 6}
          y1={8.5}
          y2={20 - 8.5}
          fill="black"
          fillOpacity={1}
          stroke="black"
        />
        {/* rest of the lines */}
        <ReferenceDot
          // mid point
          x={20}
          y={10}
          r={0.1 * scale}
          fillOpacity={1}
          fill="black"
          stroke="black"
        />
        <ReferenceArea
          //   court outline
          x1={0}
          x2={40}
          y1={0}
          y2={20}
          fillOpacity={0}
          stroke="black"
        />

        <ReferenceLine
          //   mid line
          x={20}
          stroke="black"
        />
        <XAxis type="number" dataKey="x" hide domain={[0, 40]} />
        <YAxis type="number" dataKey="y" hide domain={[0, 20]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="thorws" data={throwCords} fill="black" />
      </ScatterChart>
    </Court>
  );
}
