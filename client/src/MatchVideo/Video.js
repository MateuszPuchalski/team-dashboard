import React, { useState, useEffect, useRef, useCallback } from "react";
import useClientRect from "../Hooks/useClientRect";
import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  background: rgba(255, 255, 255, 0.4);
`;

export default function Video({ ytId, ytVideoRef, vidRef }) {
  const [rect, ref] = useClientRect();

  return (
    <Wrapper ref={ref}>
      {rect && (
        <YouTube
          ref={ytVideoRef}
          opts={{
            width: rect.width,
            height: rect.height,
          }}
          videoId={ytId}
        />
      )}
    </Wrapper>
  );
}
