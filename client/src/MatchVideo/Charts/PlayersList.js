import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

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

const CLUB_PLAYERS = gql`
  query($clubId: String!) {
    playerByClub(clubId: $clubId) {
      id
      name
      avatar
    }
  }
`;

export default function PlayersList({
  toggle,
  dropdown,
  selectPlayer,
  clubId,
}) {
  // const [playersLoading, players] = usePlayers(clubId._id);
  const { loading, error, data } = useQuery(CLUB_PLAYERS, {
    variables: { clubId: clubId },
  });

  useEffect(() => {
    console.log({ data: data, error: error, loading: loading });
  }, [data, error]);

  return (
    <PlayersWrapper>
      {loading ? (
        <h3>LOADING...</h3>
      ) : (
        data.playerByClub.map((item, i) => {
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
