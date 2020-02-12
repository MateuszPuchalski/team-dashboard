import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

export default function AdminMatchVideo({ ytId }) {
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
    <YouTube
      style={{ width: "100%", height: "100%" }}
      ref={ytVideo}
      onReady={test}
      videoId={ytId}
    />
  );
}
