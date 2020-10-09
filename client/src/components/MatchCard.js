import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { Link, useRouteMatch } from "react-router-dom";

const primarySize = "3rem";

const Card = styled.div`
  color: black;
  margin: 10px;
  background: #fff;
  width: 600px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
`;
const Result = styled.div`
  padding: 16px 80px 0 80px;
  display: flex;
  justify-content: space-around;
`;
const CompetitionName = styled.div`
  margin: 8px 0;
  color: #757575;
  text-align: center;
  font-size: 12px;
`;
const YoutubeFooter = styled.div`
  color: black;
  box-sizing: border-box;
  margin: 0 26px;
  width: 548px;
  height: 64px;
  border-top: solid 1px #ebebeb;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Score = styled.div`
  color: black;
  width: 45%;
  height: 48px;
  text-align: center;
  font-size: 36px;
  display: flex;
  justify-content: space-between;
`;
const Team = styled.div`
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TeamName = styled.div`
  text-align: center;
  line-height: 20px;
  font-size: 14px;
`;
const Logo = styled.img`
  width: 48px;
  height: 48px;
`;
const YtLogo = styled.img`
  margin-right: 8px;
  height: 20px;
`;
export default function MatchCard({ match }) {
  const date = new Date(match.matchDate);
  return (
    <Card>
      <Result>
        <Team>
          <Logo src={match.homeTeam.logo} alt={match.homeTeam.name} />
          <TeamName>{match.homeTeam.name}</TeamName>
        </Team>
        <Score>
          <div>{match.homeScore}</div>
          <div style={{ color: "#757575" }}>-</div>
          <div>{match.awayScore}</div>
        </Score>
        <Team>
          <Logo src={match.awayTeam.logo} alt={match.awayTeam.name} />
          <TeamName>{match.awayTeam.name}</TeamName>
        </Team>
      </Result>
      <CompetitionName>II Liga Piłki Ręcznej</CompetitionName>

      {/* <Logo id="calendar" src={`${process.env.PUBLIC_URL}/calendar.svg`} />
      {date.toLocaleDateString("pl-PL")} */}
      {match.ytId ? (
        <YoutubeFooter>
          <div style={{ display: "flex" }}>
            <YtLogo src={`${process.env.PUBLIC_URL}/youtube.svg`} />
            <div>Game Video</div>
          </div>
        </YoutubeFooter>
      ) : null}
    </Card>
  );
}
