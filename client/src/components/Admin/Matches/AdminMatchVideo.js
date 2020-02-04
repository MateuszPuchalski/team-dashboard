import React, { useState, useEffect } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
  width: auto;
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
`;
export default function AdminMatchVideo() {
  return (
    <Wrapper>
      <YouTube videoId="sooarZyDMUc" />
    </Wrapper>
  );
}
