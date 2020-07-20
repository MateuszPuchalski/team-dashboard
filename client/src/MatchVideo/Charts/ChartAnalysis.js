import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styled from "styled-components";
import CourtChartD3Combined from "./CourtChartD3Combined";
import GoalChartD3Combined from "./GoalChartD3Combined";
import PlayersList from "./PlayersList";
import ClubsList from "./ClubsList";

import useEvents from "../../Hooks/useEvents";
const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
`;

const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Club = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 33px;
  margin: 0 5px;
`;
const Arrow = styled.img`
  width: 15px;
  margin: 0 5px;
`;

const THROWS_BY_PLAYER = gql`
  query EventThrowByPlayer($playerId: String!) {
    eventThrowByPlayer(playerId: $playerId) {
      type
      ... on ThrowEvent {
        id
        location
        throw {
          endLocation
          outcome
          technique
        }
      }
    }
  }
`;

export default function ChartAnalysis() {
  const [rect, ref] = useClientRect();
  const [clubId, setClubId] = useState({ name: "Choose Club" });
  const [playerId, setPlayerId] = useState({
    name: "Choose Player",
  });
  // const [loadingEvents, events] = useEvents({ playerId: playerId._id });
  const [getThrows, { loading, data }] = useLazyQuery(THROWS_BY_PLAYER);
  const [throws, setThrows] = useState([]);
  const [section, setSection] = useState([[], []]);
  const [filteredThrows, setFilteredThrows] = useState([]);
  const [playerDropdown, togglePlayerDropdown] = useState(false);
  const [clubDropdown, toggleClubDropdown] = useState(false);

  useEffect(() => {
    console.log({ graphEvents: data });
  }, [data]);

  useEffect(() => {
    if (playerId !== "Choose Player") {
      getThrows({
        variables: {
          playerId: playerId.id,
        },
      });
    }
  }, [playerId]);

  useEffect(() => {
    if (data) {
      const filteredData = data.eventThrowByPlayer.filter(
        (event) =>
          event.type == "Throw" &&
          event.location &&
          event.throw &&
          event.throw.endLocation &&
          event.throw.type != "7m" &&
          event.throw.outcome != "Blocked"
      );
      setThrows(filteredData);
    }
  }, [data]);

  useEffect(() => {
    const [[x0, y0], [x1, y1]] = section;
    const filtered = throws.filter((item) => {
      return (
        item.location[0] >= x0 &&
        item.location[0] <= x1 &&
        item.location[1] <= y0 &&
        item.location[1] >= y1
      );
    });
    setFilteredThrows(filtered);
  }, [section, throws]);

  useEffect(() => {
    setPlayerId({ name: "Choose Player" });
  }, [clubId]);
  return (
    <Wrapper ref={ref}>
      <Header>
        <Player
          onClick={() => {
            togglePlayerDropdown(!playerDropdown);
          }}
        >
          {playerId.avatar && <Avatar src={playerId.avatar} />}
          {playerId.name}
          <Arrow src={process.env.PUBLIC_URL + "/down-arrow.svg"} />
        </Player>
        <Club
          onClick={() => {
            toggleClubDropdown(!clubDropdown);
          }}
        >
          <Arrow src={process.env.PUBLIC_URL + "/down-arrow.svg"} />
          {clubId.name}
          {clubId.logo && <Avatar src={clubId.logo} />}
        </Club>
      </Header>

      {playerDropdown && (
        <PlayersList
          dropdown={playerDropdown}
          toggle={togglePlayerDropdown}
          clubId={clubId.id}
          selectPlayer={setPlayerId}
        />
      )}

      {section[0][0] == section[1][0]
        ? rect !== null && <GoalChartD3Combined parent={rect} throws={throws} />
        : rect !== null && (
            <GoalChartD3Combined parent={rect} throws={filteredThrows} />
          )}

      {rect !== null && (
        <CourtChartD3Combined
          parent={rect}
          throws={throws}
          setSection={setSection}
        />
      )}
      {clubDropdown && (
        <ClubsList
          dropdown={clubDropdown}
          toggle={toggleClubDropdown}
          selectClub={setClubId}
        />
      )}
    </Wrapper>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
