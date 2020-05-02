import React, { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
`;

export default function AdminMatchVideo({ ytId, ytVideoRef, events }) {
  const [currTime, setCurrTime] = useState();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function _onReady(event) {
    // access to player in all event handlers via event.target

    // event.target.seekTo(events[0].timestamp, true);

    event.target.playVideo();
    if (events) {
      events.forEach((item) => {
        let button = document.getElementById(`${item.matchId}${item._id}`);
        button.addEventListener("click", function () {
          event.target.seekTo(item.timestamp, true);
          event.target.playVideo();
        });
      });
    }
  }

  return (
    <Wrapper>
      <button onClick={() => setDimensions({ width: 800, height: 800 })}>
        BUTTON
      </button>
      <YouTube
        ref={ytVideoRef}
        onReady={_onReady}
        opts={{
          width: dimensions.width,
          height: dimensions.height,
        }}
        videoId={ytId}
      />
    </Wrapper>
  );
}
