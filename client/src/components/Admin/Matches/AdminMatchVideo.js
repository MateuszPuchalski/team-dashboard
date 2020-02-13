import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function AdminMatchVideo({ ytId }) {
  const [currTime, setCurrTime] = useState();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ytVideo = useRef(null);
  const wrapperRef = useRef(null);

  const setTime = async () => {
    const time = await ytVideo.current.internalPlayer.getCurrentTime();
    console.log(time);
    setCurrTime(Math.round(time * 100) / 100);
  };

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
        ref={ytVideo}
        opts={{
          width: dimensions.width,
          height: dimensions.height
        }}
        videoId={ytId}
      />
    </Wrapper>
  );
}
