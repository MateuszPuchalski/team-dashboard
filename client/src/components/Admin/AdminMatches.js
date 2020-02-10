import React from "react";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminJsonData from "./AdminJsonData";
import AdminHalfCourt from "./Charts/AdminHalfCourt";
import AdminGoalChart from "./Charts/AdminGoalChart";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default function Admin() {
  return (
    <>
      <Wrapper>
        {/* <AdminShowMatches /> */}
        <AdminJsonData />
        <AdminMatchVideo />
        <AdminCourtChart scale={15} />
      </Wrapper>
      <Wrapper>
        <AdminGoalChart scale={150} />
      </Wrapper>
    </>
  );
}
