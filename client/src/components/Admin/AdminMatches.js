import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AdminMatchVideo from "./Matches/AdminMatchVideo";
import AdminCourtChart from "./Charts/AdminCourtChart";
import AdminGoalChart from "./Charts/AdminGoalChart";
import AdminEventForm from "./Forms/AdminEventForm";

import useMatches from "./Hooks/useMatches";

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
const ShowEvent = styled.div`
  display: flex;
  flex-direction: column;

  grid-column: 5 / 6;
  grid-row: 1 / 6;
`;
export default function AdminMatches() {
  const { matchId } = useParams();
  const [matchLoading, match] = useMatches(matchId);
  console.log({ matchytid: match });
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
          ytId={match.ytId}
        />
      </Video>
      <AddEvent></AddEvent>
      <ShowEvent>
        <AdminEventForm />
        <AdminCourtChart scale={9} />
        <AdminGoalChart scale={120} />
      </ShowEvent>
    </Wrapper>
  );
}
