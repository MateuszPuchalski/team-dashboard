import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function AdminMatchVideo({ ytId, ytVideoRef }) {
  const [currTime, setCurrTime] = useState();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef) {
      console.log(wrapperRef);
      const cur = wrapperRef.current;
      setDimensions({ width: cur.clientWidth, height: cur.clientHeight });
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <YouTube
        ref={ytVideoRef}
        opts={{
          width: dimensions.width,
          height: dimensions.height
        }}
        videoId={ytId}
      />
    </Wrapper>
  );
}
