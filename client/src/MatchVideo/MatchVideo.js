import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import styled from "styled-components";
import Video from "./Video";
import EventList from "./EventList/EventList";
import { useQuery, gql } from "@apollo/client";
import useClientRect from "../Hooks/useClientRect";

import EventPicker from "./EventPicker2/EventPicker";
import EventDescription from "./EventPicker2/EventDescription";

const Main = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const Wrapper = styled.div`
  // display: flex;
  position: relative;
  width: calc(100% - 5rem);

  left: 5rem;
  // flex-direction: row-reverse;
`;
const Vid = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: rgba(255, 255, 255, 0.4);
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }
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

const MATCH = gql`
  query($matchId: String!) {
    matchById(matchId: $matchId) {
      ytId
      homeTeam {
        id
      }
      awayTeam {
        id
      }
    }
  }
`;

export default function MatchVideo() {
  const { matchId } = useParams();
  const { loading, error, data } = useQuery(MATCH, {
    variables: {
      matchId: matchId,
    },
  });
  const ytVideoRef = useRef(null);
  const vidRef = useRef(null);
  const [rect, ref] = useClientRect();

  if (loading) return <h3>LOADING!!</h3>;
  if (error) return <h3>ERROR!! {error.message}</h3>;

  return (
    <>
      <Wrapper>
        {/* <TopBar /> */}
        <Main>
          <ShowEvent ref={ref}>
            <EventDescription parent={rect} ytVideoRef={ytVideoRef} />
            <EventList ytVideoRef={ytVideoRef} matchId={matchId} />
          </ShowEvent>
          <Vid ref={vidRef}>
            <Video
              ytVideoRef={ytVideoRef}
              ytId={data.matchById.ytId}
              vidRef={vidRef}
            />
          </Vid>
        </Main>
      </Wrapper>
    </>
  );
}
