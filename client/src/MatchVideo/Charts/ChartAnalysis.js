import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CourtChartD3Combined from "./CourtChartD3Combined";
import GoalChartD3Combined from "./GoalChartD3Combined";
import PlayersList from "./PlayersList";
import ClubsList from "./ClubsList";

import useEvents from "../../Hooks/useEvents";
const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: relative;
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

export default function ChartAnalysis() {
  const [clubId, setClubId] = useState({ name: "Choose Club" });
  const [playerId, setPlayerId] = useState({
    name: "Choose Player",
  });
  const [loadingEvents, events] = useEvents({ playerId: playerId._id });
  const [throws, setThrows] = useState([]);
  const [section, setSection] = useState([[], []]);
  const [filteredThrows, setFilteredThrows] = useState([]);
  const [playerDropdown, togglePlayerDropdown] = useState(false);
  const [clubDropdown, toggleClubDropdown] = useState(false);

  useEffect(() => {
    const filteredData = events.filter(
      (event) =>
        event.type == "Throw" &&
        event.throw &&
        event.throw.type != "7m" &&
        event.throw.outcome != "Blocked"
    );
    setThrows(filteredData);
  }, [events]);

  useEffect(() => {
    const [[x0, y0], [x1, y1]] = section;
    const filtered = throws.filter((item) => {
      return (
        item.location[0].x >= x0 &&
        item.location[0].x <= x1 &&
        item.location[0].y <= y0 &&
        item.location[0].y >= y1
      );
    });
    console.log(filtered);
    setFilteredThrows(filtered);
  }, [section, throws]);

  useEffect(() => {
    setPlayerId({ name: "Choose Player" });
  }, [clubId]);

  return (
    <Wrapper>
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
          clubId={clubId}
          selectPlayer={setPlayerId}
        />
      )}

      {section[0][0] == section[1][0] ? (
        <GoalChartD3Combined throws={throws} />
      ) : (
        <GoalChartD3Combined throws={filteredThrows} />
      )}
      <CourtChartD3Combined throws={throws} setSection={setSection} />
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
