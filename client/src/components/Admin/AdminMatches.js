import React from "react";
import styled from "styled-components";

import AdminAddClub from "./AdminAddClub";
import AdminAddPlayer from "./AdminAddPlayer";
import AdminShowPlayers from "./AdminShowPlayers";
import AdminMatches from "./Matches/AdminMatches";
import AdminShowMatches from "./Matches/AdminSchowMatches";
import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminJsonData from "./AdminJsonData";

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
    </>
  );
}
