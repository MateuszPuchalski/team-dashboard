import React, { useState, useEffect, useRef, useCallback } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function Video({ ytId, ytVideoRef, vidRef }) {
  const [rect, ref] = useClientRect();

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
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

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
