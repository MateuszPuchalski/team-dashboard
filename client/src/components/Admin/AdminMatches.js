import React from "react";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminJsonData from "./AdminJsonData";
import AdminHalfCourt from "./Charts/AdminHalfCourt";

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
      <AdminHalfCourt scale={15} />
    </>
  );
}
