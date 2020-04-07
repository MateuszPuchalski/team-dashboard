import React from "react";
import LogoutButton from "../LogutButton";
import MatchCard from "./MatchCard";
import Metrics from "./Metrics";
import SeasonStats from "./SeasonStats";
import styled from "styled-components";
import TestChart from "../Charts/TestChart";
import BusinesCard from "./BusinesCard";
import Silhouette from "./Silhouette";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${process.env.PUBLIC_URL}/meczreczna.jpg);
  background-size: cover;

  /* background: rgba(255, 0, 0, 0.7); */
`;
// const BackgroundImg = styled.img`
//   position: absolute;
//   height: 100vh;
//   width: 100vw;
//   /* filter: opacity(30%); */
//   z-index: -1;
//   object-fit: cover;
// `;
const PositionWrap = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(255, 0, 0, 0.7);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  position: relative;
  /* z-index: 100; */
  img {
    /* left: 10px; */
    position: absolute;
    height: 100%;
    object-fit: contain;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
export default function ProfilePage() {
  return (
    <Wrapper>
      <PositionWrap>
        <Left>
          <BusinesCard />
          <Metrics />
          <SeasonStats />
        </Left>
        <Center>
          {/* <Silhouette /> */}

          <TestChart />
        </Center>

        <Right>
          <MatchCard />
        </Right>
      </PositionWrap>

      {/* <div>
        <h1>Profile Page</h1>
      </div>

      <LogoutButton /> */}
    </Wrapper>
  );
}
