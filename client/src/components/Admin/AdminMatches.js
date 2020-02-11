import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminGoalChart from "./Charts/AdminGoalChart";
import AdminEventForm from "./Forms/AdminEventForm";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(4, 25vh);
`;
const Video = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 4;
  width: 100%;
  height: 100%;
`;
const AddEvent = styled.div`
  display: flex;
  grid-column: 1 / 5;
  grid-row: 4 / 5;
`;
export default function AdminMatches() {
  const { matchId } = useParams();
  const videoRef = useRef(null);
  const [videoDiemsions, setVideoDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (videoRef) {
      console.log(videoRef.current.clientHeight);
      setVideoDimensions({
        height: videoRef.current.clientHeight,
        width: videoRef.current.clientWidth
      });
    }
  }, []);

  return (
    <Wrapper>
      <Video ref={videoRef}>
        <AdminMatchVideo
          width={videoDiemsions.width}
          height={videoDiemsions.height}
          matchId={matchId}
        />
      </Video>
      <AddEvent>
        <AdminCourtChart scale={10} />
        <AdminGoalChart scale={100} />
        <AdminEventForm />
      </AddEvent>
    </Wrapper>
  );
}
