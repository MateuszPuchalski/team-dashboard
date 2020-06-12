import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useEvents from "../../Hooks/useEvents";
import useMatches from "../../Hooks/useMatches";
import { useQuery, gql } from "@apollo/client";

import EventCard from "./EventCard";
const textPrimary = "white";
const textSecondary = "#ececec";
const bgPrimary = "#2D1B34";
const bgSecondary = "#1B2E33";
const transitionSpeed = "200ms";

const Events = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  color: white;

  background: ${(props) => props.theme.bg};

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

const EVENTS = gql`
  query($matchId: String!) {
    eventByMatch(matchId: $matchId) {
      type
      timestamp
      ... on ThrowEvent {
        player {
          name
        }
        throw {
          outcome
          endLocation
        }
      }
      ... on TurnoverEvent {
        turnover {
          type
        }
      }
      ... on PunishmentEvent {
        punishment {
          type
        }
      }
    }
  }
`;

export default function EventList({ matchId, ytVideoRef }) {
  const { loading, error, data } = useQuery(EVENTS, {
    variables: {
      matchId: matchId,
    },
  });

  if (loading) return <h3>LOADING...</h3>;
  return (
    <Events>
      {data.eventByMatch.map((event) => {
        return <EventCard eventData={event} ytVideoRef={ytVideoRef} />;
      })}
    </Events>
  );
}
