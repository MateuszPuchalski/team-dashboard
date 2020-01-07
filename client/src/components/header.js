import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 13;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background: pink;
  }
`;

export default function Header() {
  // let { id } = useParams();
  return (
    <Wrapper>
      <div>OVERVIEW</div>

      <div>TRAINING</div>
      <div>
        <Link to={`/stats/1`}>STATS</Link>
      </div>

      <div>TRANSFERS</div>
      <div>REPORTS</div>
    </Wrapper>
  );
}
