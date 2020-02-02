import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "./avatar";
import { Link, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1 / span 13;
  background: red;
  li: {
    diplay: flex;
  }
`;
export default function Sidebar() {
  const match = useRouteMatch();
  return (
    <Wrapper>
      <h1>Sidebar</h1>
      <ul>
        <li>
          <Link to={`${match.url}/club`}>Club</Link>
        </li>
        <li>
          <Link to={`${match.url}/players`}>Players</Link>
        </li>
        <li>
          <Link to={`${match.url}/matches`}>Matches</Link>
        </li>
      </ul>
    </Wrapper>
  );
}
