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
  YAxis,
  Curve
} from "recharts";
import styled from "styled-components";

const Court = styled.div`
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
`;

export default function AdminHalfCourt({ scale }) {
  return (
    <Court>
      <ScatterChart
        width={20 * scale}
        height={20 * scale}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <ReferenceArea
          //   court outline
          x1={0}
          x2={20}
          y1={0}
          y2={20}
          fillOpacity={1}
          fill="#dfbb85"
          stroke="black"
        />
        <ReferenceDot
          // 9 meter line
          x={8.5}
          y={20}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceDot
          // 9 meter line
          x={11.5}
          y={20}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceArea
          // 9 meter fill up
          x1={8.5}
          x2={20 - 8.5}
          y1={11}
          y2={20}
          fill="#981717"
          fillOpacity={1}
          stroke="#981717"
        />
        <ReferenceDot
          // 6 mater line
          x={8.5}
          y={20}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceDot
          // 6 mater line
          x={11.5}
          y={20}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceArea
          // 6 line square fill up
          x1={8.5}
          x2={20 - 8.5}
          y1={14}
          y2={20}
          fill="#f9c852"
          fillOpacity={1}
          stroke="#f9c852"
        />
        <ReferenceArea
          //4m line left side
          x1={9.75}
          x2={10.25}
          y1={16}
          y2={16.1}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //7m line left side
          x1={9.5}
          x2={10.5}
          y1={13}
          y2={13.1}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //goal left side
          x1={8.5}
          x2={11.5}
          y1={20}
          y2={19.9}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <XAxis type="number" dataKey="x" hide domain={[0, 20]} />
        <YAxis type="number" dataKey="y" hide domain={[0, 20]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="thorws" fill="black" />
      </ScatterChart>
    </Court>
  );
}
