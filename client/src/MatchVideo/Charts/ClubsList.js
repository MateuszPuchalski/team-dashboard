import React from "react";
import styled from "styled-components";

import useClubs from "../../Hooks/useClubs";

const ClubsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  position: absolute;
  background: whitesmoke;
  width: 300px;
  top: 20px;
  right: 20px;
  padding: 10px;
  box-shadow: 11px 10px 30px -8px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;

const Club = styled.div`
  display: flex;
  justify-content: flex-end;

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

export default function PlayersList({ dropdown, toggle, selectClub }) {
  const [clubsLoading, clubs] = useClubs();

  return (
    <ClubsWrapper>
      {clubsLoading ? (
        <h3>LOADING...</h3>
      ) : (
        clubs.map((item, i) => {
          return (
            <Club
              key={i}
              onClick={() => {
                selectClub(item);
                toggle(!dropdown);
              }}
            >
              {item.name}
              <img src={item.logo} />
            </Club>
          );
        })
      )}
    </ClubsWrapper>
  );
}
