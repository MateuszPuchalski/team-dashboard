import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AdminMatchVideo from "./Matches/AdminMatchVideo";
import EventList from "../EventList";

import EventPicker from "../EventPicker/EventPicker";

import useMatches from "../../Hooks/useMatches";

import { eventAddingActions } from "../../_actions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const Video = styled.div`
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

  height: 35px;
  border-radius: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 180, 255, 1) 50%,
    rgba(84, 101, 213, 1) 100%
  );
`;

export default function AdminMatches() {
  const dispatch = useDispatch();
  const { matchId } = useParams();
  const [toggle, set] = useState(false);
  const [matchLoading, match] = useMatches(matchId);

  dispatch(eventAddingActions.getMatch(matchId));
  const ytVideoRef = useRef(null);

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
          <Video>
            <AdminMatchVideo ytVideoRef={ytVideoRef} ytId={match.ytId} />
            {toggle && <EventPicker ytVideoRef={ytVideoRef} />}
          </Video>
        </Wrapper>
      </>
    );
  } else {
    return <h3>LOADING...</h3>;
  }
}
