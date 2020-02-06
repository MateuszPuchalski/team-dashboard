import React, { useState, useEffect, useRef } from "react";

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
  const [currTime, setCurrTime] = useState();
  const ytVideo = useRef(null);

  const setTime = async () => {
    const time = await ytVideo.current.internalPlayer.getCurrentTime();
    console.log(time);
    setCurrTime(Math.round(time * 100) / 100);
  };

  const test = e => {
    console.log(e);
  };
  return (
    <Wrapper>
      <YouTube ref={ytVideo} onReady={test} videoId="sooarZyDMUc" />
      <button onClick={setTime}>Current Time</button>
      <p>{currTime}</p>
    </Wrapper>
  );
}
