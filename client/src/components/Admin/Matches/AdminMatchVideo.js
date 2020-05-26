import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function AdminMatchVideo({ ytId, ytVideoRef }) {
  const [dimensions, setDimensions] = useState({ width: 1300, height: 900 });

  return (
    <Wrapper>
      <YouTube
        ref={ytVideoRef}
        opts={{
          width: dimensions.width,
          height: dimensions.height,
        }}
        videoId={ytId}
      />
    </Wrapper>
  );
}
