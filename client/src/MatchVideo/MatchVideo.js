import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Video from "./Video";
import EventList from "./EventList/EventList";

import EventPicker from "./EventPicker/components/EventPicker";

import useMatches from "../Hooks/useMatches";
import { setActiveMatch } from "./matchVideoDuck";
import { eventAddingActions } from "../_actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const Vid = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  background: rgba(255, 255, 255, 0.4);
`;

const AddEvent = styled.div`
  display: none;

  justify-content: center;
  align-items: center;
`;
const ShowEvent = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
`;
const Toggle = styled.img`
  position: absolute;
  z-index: 100;
  height: 35px;
  border-radius: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 180, 255, 1) 50%,
    rgba(84, 101, 213, 1) 100%
  );
`;

export default function MatchVideo() {
  const dispatch = useDispatch();
  const { matchId } = useParams();
  const [toggle, set] = useState(false);
  const [matchLoading, match] = useMatches(matchId);

  dispatch(setActiveMatch(match));
  const ytVideoRef = useRef(null);
  const vidRef = useRef(null);
  if (match) {
    return (
      <>
        <Wrapper>
          <Toggle
            src={process.env.PUBLIC_URL + "/toggleadd.svg"}
            onClick={() => set(!toggle)}
          />
          <ShowEvent>
            <EventList ytVideoRef={ytVideoRef} matchId={matchId} />
          </ShowEvent>
          <Vid ref={vidRef}>
            {vidRef.current && (
              <Video
                ytVideoRef={ytVideoRef}
                ytId={match.ytId}
                vidRef={vidRef}
              />
            )}

            {toggle && <EventPicker ytVideoRef={ytVideoRef} />}
          </Vid>
        </Wrapper>
      </>
    );
  } else {
    return <h3>LOADING...</h3>;
  }
}
