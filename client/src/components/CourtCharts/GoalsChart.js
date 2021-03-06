import React from "react";

import {
  ReferenceArea,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import styled from "styled-components";

const Court = styled.div`
  margin: 10px;
  display: contents;
  background: rgba(255, 255, 255, 0.1);
`;

function GoalChartTooltip(props) {
  console.log(props);
  return props.active ? (
    <div>
      {props.payload[0].payload.name}
      <p>{props.payload[0].payload.technique}</p>
    </div>
  ) : null;
}

export default function GoalChart({ scale, cords }) {
  return (
    <Court>
      <ScatterChart
        width={3 * scale}
        height={2 * scale}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <ReferenceArea
          //background
          x1={7.5}
          x2={12.5}
          y1={0}
          y2={3}
          stroke="black"
          fill="grey"
          strokeOpacity={1}
        />
        <ReferenceArea
          //goal with post
          x1={8.42}
          x2={11.58}
          y1={0}
          y2={2.08}
          stroke="black"
          fill="red"
          strokeOpacity={1}
        />
        <ReferenceArea
          //goal without post
          x1={8.5}
          x2={11.5}
          y1={0}
          y2={2}
          stroke="black"
          fill="white"
          strokeOpacity={1}
        />
        <XAxis type="number" dataKey="y" hide domain={[7.5, 12.5]} />
        <YAxis type="number" dataKey="z" hide domain={[0, 3]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<GoalChartTooltip />}
        />
        <Scatter name="thorws" data={cords.accurate} fill="green" />
        <Scatter name="thorws" data={cords.failed} fill="red" />
      </ScatterChart>
    </Court>
  );
}
