import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

export default function AdminMatchVideo({ width, height, ytId }) {
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
  const opts = { height: height, width: width };

  return <YouTube ref={ytVideo} opts={opts} onReady={test} videoId={ytId} />;
}
