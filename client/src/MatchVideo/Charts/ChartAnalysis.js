import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CourtChartD3Combined from "./CourtChartD3Combined";
import GoalChartD3Combined from "./GoalChartD3Combined";
import PlayersList from "./PlayersList";
import ClubsList from "./ClubsList";

import useEvents from "../../Hooks/useEvents";

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const PlayerDropdownWrapper = styled.div`
  position: absolute;
  background: "whitesmoke";
`;

export default function ChartAnalysis() {
  const [clubId, setClubId] = useState("5e259ca1c60ff01770db40ff");
  const [playerId, setPlayerId] = useState({
    name: "Mateusz Puchalski",
    _id: "5e3606a51dba6b0ac451eb42",
  });
  const [loadingEvents, events] = useEvents({ playerId: playerId._id });
  const [throws, setThrows] = useState([]);
  const [section, setSection] = useState([[], []]);
  const [filteredThrows, setFilteredThrows] = useState([]);
  const [playerDropdown, togglePlayerDropdown] = useState(false);

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

  return (
    <Wrapper>
      {/* hack */}
      <div
        onClick={() => {
          togglePlayerDropdown(!playerDropdown);
        }}
      >
        {playerId.name}
      </div>

      {playerDropdown && (
        <PlayersList clubId={clubId} selectPlayer={setPlayerId} />
      )}

      {section[0][0] == section[1][0] ? (
        <GoalChartD3Combined throws={throws} />
      ) : (
        <GoalChartD3Combined throws={filteredThrows} />
      )}
      <CourtChartD3Combined throws={throws} setSection={setSection} />
      <ClubsList selectClub={setClubId} />
    </Wrapper>
  );
}
