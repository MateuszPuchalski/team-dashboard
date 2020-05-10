import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Curve,
} from "recharts";

import styled from "styled-components";
import { eventAddingActions } from "../../_actions";
const Court = styled.div`
  margin: 10px;

  background: rgba(255, 255, 255, 0.1);
`;

export default function AdminCourtChart({ scale }) {
  const dispatch = useDispatch();
  const getCords = (e) => {
    dispatch(
      eventAddingActions.setCourtCords({
        x: Math.round(e.xValue * 100) / 100,
        y: Math.round(e.yValue * 100) / 100,
      })
    );
  };
  const cords = useSelector((state) => state.eventShape.courtCords);

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
          left: 0,
        }}
      >
        <ReferenceArea
          //   court outline
          x1={0}
          x2={40}
          y1={0}
          y2={20}
          fillOpacity={1}
          fill="#dfbb85"
          stroke="black"
        />
        {/* LEFt SIDE  */}
        <ReferenceDot
          // 9 meter line
          x={0}
          y={8.5}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceDot
          // 9 meter line
          x={0}
          y={11.5}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceArea
          // 9 meter fill up
          x1={0}
          x2={9}
          y1={8.5}
          y2={20 - 8.5}
          fill="#981717"
          fillOpacity={1}
          stroke="#981717"
        />
        <ReferenceDot
          // 6 mater line
          x={0}
          y={8.5}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceDot
          // 6 mater line
          x={0}
          y={11.5}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceArea
          // 6 line square fill up
          x1={0}
          x2={6}
          y1={8.5}
          y2={20 - 8.5}
          fill="#f9c852"
          fillOpacity={1}
          stroke="#f9c852"
        />

        {/* Right Side */}
        <ReferenceDot
          // 9 meter line
          x={40}
          y={8.5}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceDot
          // 9 meter line
          x={40}
          y={11.5}
          r={9 * scale}
          fillOpacity={1}
          fill="#981717"
          stroke="#981717"
        />
        <ReferenceArea
          // 9 meter fill up
          x1={40}
          x2={40 - 9}
          y1={8.5}
          y2={20 - 8.5}
          fill="#981717"
          fillOpacity={1}
          stroke="#981717"
        />
        <ReferenceDot
          // 6 mater line
          x={40}
          y={8.5}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceDot
          // 6 mater line
          x={40}
          y={11.5}
          r={6 * scale}
          fillOpacity={1}
          fill="#f9c852"
          stroke="#f9c852"
        />
        <ReferenceArea
          // 6 line square fill up
          x1={40}
          x2={40 - 6}
          y1={8.5}
          y2={20 - 8.5}
          fill="#f9c852"
          fillOpacity={1}
          stroke="#f9c852"
        />
        {/* rest of the lines */}

        <ReferenceLine
          //   mid line
          x={20}
          stroke="black"
        />
        <ReferenceArea
          //4m line left side
          x1={4}
          x2={4.1}
          y1={9.75}
          y2={10.25}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //7m line left side
          x1={7}
          x2={7.1}
          y1={9.5}
          y2={10.5}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //4m line right side
          x1={40 - 4}
          x2={40 - 4.1}
          y1={9.75}
          y2={10.25}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //7m line right side
          x1={40 - 7}
          x2={40 - 7.1}
          y1={9.5}
          y2={10.5}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />

        <ReferenceArea
          //strefa zmian left sidebar
          x1={15.5}
          x2={15.6}
          y1={0.25}
          y2={0}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //strefa zmian right side
          x1={40 - 15.5}
          x2={40 - 15.6}
          y1={0.25}
          y2={0}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //goal left side
          x1={0}
          x2={0.1}
          y1={8.5}
          y2={11.5}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <ReferenceArea
          //goal right side
          x1={40}
          x2={40 - 0.1}
          y1={8.5}
          y2={11.5}
          stroke="black"
          fill="black"
          strokeOpacity={1}
        />
        <XAxis type="number" dataKey="x" hide domain={[0, 40]} />
        <YAxis type="number" dataKey="y" hide domain={[0, 20]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="throws" data={[cords]} fill="black" />
      </ScatterChart>
    </Court>
  );
}
