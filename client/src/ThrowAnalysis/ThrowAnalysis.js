import React, { useState } from "react";
import styled from "styled-components";
import ChartAnalysis from "../MatchVideo/Charts/ChartAnalysis";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function ThrowAnalysis() {
  const [chartCount, setChartCount] = useState(1);

  return (
    <Wrapper>
      {Array.from(Array(chartCount)).map((x, i) => (
        <ChartAnalysis key={`throwAnalysis${i}`} />
      ))}

      <button onClick={() => setChartCount(chartCount + 1)}>ADD</button>
    </Wrapper>
  );
}
