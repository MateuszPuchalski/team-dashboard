import React from "react";
import styled from "styled-components";

import AdminAddClub from "./AdminAddClub";
import AdminAddPlayer from "./AdminAddPlayer";
import AdminShowPlayers from "./AdminShowPlayers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default function Admin() {
  return (
    <Wrapper>
      <AdminAddClub />
      <AdminAddPlayer />
      <AdminShowPlayers />
    </Wrapper>
  );
}
