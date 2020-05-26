import React from "react";
import styled from "styled-components";

import useClubs from "../../Hooks/useClubs";

const ClubsWrapper = styled.div`
  width: 500px;
  margin: 10px 0;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const Club = styled.div`
  padding: 5px;
  img {
    height: 33px;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.33);
  }
`;

export default function PlayersList({ selectClub }) {
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
                selectClub(item._id);
              }}
            >
              <img src={item.logo} />
            </Club>
          );
        })
      )}
    </ClubsWrapper>
  );
}
