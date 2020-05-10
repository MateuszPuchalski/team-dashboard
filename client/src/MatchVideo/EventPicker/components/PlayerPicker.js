import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PlayerButton from "./PlayerButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fetchPlayers = async (clubId) => {
  return await (await fetch(`/api/players/club/${clubId}`)).json();
};

export default function PlayerPicker({ clubId }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers(clubId).then((data) => setPlayers(data));
    console.log(clubId);
  }, []);

  return (
    <Wrapper>
      {players
        ? players.map((element) => {
            return (
              <PlayerButton
                playerInfo={element}
                key={element._id}
                id={element._id}
              />
            );
          })
        : "Loading"}
    </Wrapper>
  );
}
