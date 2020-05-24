import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CourtChartD3Combined from "./CourtChartD3Combined";
import GoalChartD3Combined from "./GoalChartD3Combined";
import usePlayers from "../../Hooks/usePlayers";
import useClubs from "../../Hooks/useClubs";

const Wrapper = styled.div`
  margin: 10px;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 10px 0;
  width: 500px;
  img {
    height: 33px;
  }
`;

const ClubsWrapper = styled.div`
  width: 500px;
  margin: 10px 0;
`;

// Mateusz: 5e3606a51dba6b0ac451eb42
// Przemek: 5e36cd76afad472cc88b643f
// Stec: 5e36ceecada671067c5a818e
// Murzyn: 5e36ce5aada671067c5a8189

// const players = [
//   { name: "Mateusz", playerId: "5e3606a51dba6b0ac451eb42" },
//   { name: "Przemek", playerId: "5e36cd76afad472cc88b643f" },
//   { name: "Stec", playerId: "5e36ceecada671067c5a818e" },
//   { name: "Murzyn", playerId: "5e36ce5aada671067c5a8189" },
// ];

export default function ChartAnalysis() {
  const [playerId, setPlayerId] = useState("5e3606a51dba6b0ac451eb42");
  const [clubId, setClubId] = useState("5e259ca1c60ff01770db40ff");
  const [point, setPoint] = useState({});
  const [name, setName] = useState("Mateusz Puchalski");
  const [playersLoading, players] = usePlayers({
    clubId: clubId,
  });
  const [clubsLoading, clubs] = useClubs({});
  const [section, setSection] = useState([[], []]);
  const [events, setEvents] = useState([]);
  const [throws, setThrows] = useState([]);
  const [filteredThrows, setFilteredThrows] = useState([]);

  useEffect(() => {
    setEvents([]);
    fetch(`/api/events/player/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setThrows(
          data.filter(
            (event) =>
              event.type == "Throw" &&
              event.throw &&
              event.throw.outcome != "7m" &&
              event.throw.outcome != "Blocked"
          )
        );
      });
  }, [playerId]);

  useEffect(() => {
    const x0 = section[0][0];
    const y0 = section[0][1];
    const x1 = section[1][0];
    const y1 = section[1][1];
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
  }, [section]);

  return (
    <Wrapper>
      <h3>{name}</h3>
      <GoalChartD3Combined throws={filteredThrows} />
      <CourtChartD3Combined
        throws={throws}
        setSection={setSection}
        setPoint={setPoint}
      />
      <PlayersWrapper>
        {playersLoading ? (
          <h3>LOADING...</h3>
        ) : (
          players.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setName(item.name);
                  setPlayerId(item._id);
                }}
              >
                {item.avatar && <img src={item.avatar} />}
                {item.name}
              </button>
            );
          })
        )}
      </PlayersWrapper>
      <ClubsWrapper>
        {clubsLoading ? (
          <h3>LOADING...</h3>
        ) : (
          clubs.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setClubId(item._id);
                }}
              >
                {item.name}
              </button>
            );
          })
        )}
      </ClubsWrapper>
    </Wrapper>
  );
}
