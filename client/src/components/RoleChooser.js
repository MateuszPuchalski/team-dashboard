import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  div {
    width: 250px;
    height: 250px;
  }
`;

export default function RoleChooser() {
  const [selectedRole, setSelectedRole] = useState("Coach");
  return (
    <Wrapper>
      <h1>{selectedRole}</h1>
      <div onClick={() => setSelectedRole("Coach")}>Coach</div>
      <div onClick={() => setSelectedRole("Club")}>Club</div>
      <div onClick={() => setSelectedRole("Player")}>Player</div>
    </Wrapper>
  );
}
