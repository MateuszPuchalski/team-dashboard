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

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setDimensions({
  //       width: vidRef.current.clientWidth,
  //       height: vidRef.current.clientHeight,
  //     });
  //   });
  //   return () => {
  //     window.removeEventListener("resize");
  //   };
  // }, []);

  console.log({ RECT: rect });
  return (
    <Wrapper ref={ref}>
      {rect && (
        <YouTube
          ref={ytVideoRef}
          opts={{
            width: rect.width,
            height: window.innerHeight,
          }}
          videoId={ytId}
        />
      )}
    </Wrapper>
  );
}
