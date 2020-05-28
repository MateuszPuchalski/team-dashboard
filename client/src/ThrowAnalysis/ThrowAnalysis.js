import React, { useState } from "react";
import styled from "styled-components";
import ChartAnalysis from "../MatchVideo/Charts/ChartAnalysis";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const AddChartButton = styled.button`
  margin: 10px;
  height: 500px;
`;

export default function ThrowAnalysis() {
  const [chartCount, setChartCount] = useState(1);

  return (
    <Wrapper>
      {Array.from(Array(chartCount)).map((x, i) => (
        <ChartAnalysis key={`throwAnalysis${i}`} />
      ))}

      <AddChartButton onClick={() => setChartCount(chartCount + 1)}>
        ADD
      </AddChartButton>
    </Wrapper>
  );
}
