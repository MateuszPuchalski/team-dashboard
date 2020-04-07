import React from "react";
import styled from "styled-components";

const borderRadius = "5px";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: ${borderRadius};

  color: whitesmoke;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  padding: 2rem;

  margin: 1rem;
  .number {
    font-size: 2rem;
    font-weight: bold;
  }
  .desc {
    text-align: center;
  }
`;

export default function Metrics() {
  return (
    <Wrapper>
      <div id="yr">
        <div className="number">24</div>
        <div className="desc">yr</div>
      </div>
      <div id="height">
        <div className="number">189</div>
        <div className="desc">cm</div>
      </div>
      <div id="weight">
        <div className="number">95</div>
        <div className="desc">kg</div>
      </div>
    </Wrapper>
  );
}
