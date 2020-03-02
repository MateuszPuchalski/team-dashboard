import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { Link, useRouteMatch } from "react-router-dom";

const primarySize = "3rem";

const Card = styled.div`
  color: black;
  position: relative;
  background: white;
  border-radius: 0.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-decoration: none;
  width: 25rem;
  height: 8rem;

  #yt {
    width: 1.5rem;
    position: absolute;
    top: 1rem;
    left: 0.5rem;
  }

  img {
    width: ${primarySize};
  }

  .score {
    font-size: 3.5rem;
    font-weight: bold;
    margin: 1rem;
  }

  .midContainer {
    position: relative;
    display: flex;
    flex-direction: column;

    font-weight: bold;
  }
`;
export default function MatchCard({ match }) {
  return (
    <Card>
      <div id="home" classname="logoScoreContainer">
        <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
        <span className="score">{match.homeScore}</span>
      </div>
      <div>
        <div className="midContainer">
          <span>FINAL</span>
          {match.ytId ? (
            <img id="yt" src={`${process.env.PUBLIC_URL}/youtube.svg`} />
          ) : null}
        </div>
      </div>
      <div id="away" classname="logoScoreContainer">
        <span className="score">{match.awayScore}</span>
        <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
      </div>
    </Card>
  );
}
