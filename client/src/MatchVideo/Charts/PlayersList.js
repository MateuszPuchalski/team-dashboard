import React from "react";
import styled from "styled-components";

import usePlayers from "../../Hooks/usePlayers";

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  position: absolute;
  background: whitesmoke;
  width: 300px;
  top: 20px;
  left: 20px;
  padding: 10px;
  box-shadow: 11px 10px 30px -8px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;

const Player = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  align-items: center;
  img {
    height: 33px;
  }
  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255);
  }
`;

export default function PlayersList({
  toggle,
  dropdown,
  selectPlayer,
  clubId,
}) {
  const [playersLoading, players] = usePlayers(clubId._id);

  return (
    <PlayersWrapper>
      {playersLoading ? (
        <h3>LOADING...</h3>
      ) : (
        players.map((item, i) => {
          return (
            <Player
              key={i}
              onClick={() => {
                selectPlayer(item);
                toggle(!dropdown);
              }}
            >
              {item.avatar && <img src={item.avatar} />}
              {item.name}
            </Player>
          );
        })
      )}
    </PlayersWrapper>
  );
}
