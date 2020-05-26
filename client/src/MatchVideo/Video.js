import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function Video({ ytId, ytVideoRef, vidRef }) {
  const [dimensions, setDimensions] = useState({
    width: vidRef.current.clientWidth,
    height: vidRef.current.clientHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: vidRef.current.clientWidth,
        height: vidRef.current.clientHeight,
      });
    });
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

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
