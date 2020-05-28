import React from "react";
import styled from "styled-components";

import usePlayers from "../../Hooks/usePlayers";

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
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

export default function PlayersList({ selectPlayer, clubId }) {
  const [playersLoading, players] = usePlayers(clubId);

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
