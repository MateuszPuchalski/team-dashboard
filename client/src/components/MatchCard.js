import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { Link, useRouteMatch } from "react-router-dom";

const primarySize = "3rem";

const Card = styled.div`
  position: relative;
  background: grey;
  border-radius: 0.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  width: 20rem;
  height: 8rem;

  #home {
    margin-left: 1rem;
  }
  #away {
    margin-right: 1rem;
  }
  #yt {
    width: 1.5rem;
  }

  img {
    width: ${primarySize};
  }

  .score {
    font-size: ${primarySize};
  }
`;
export default function MatchCard({ match }) {
  return (
    <Card>
      <div id="home" classname="logoScoreContainer">
        <img src={`${process.env.PUBLIC_URL}/club.svg`} />
        <span className="score">{match.homeScore}</span>
      </div>
      <div>
        VS{" "}
        {match.ytId ? (
          <img id="yt" src={`${process.env.PUBLIC_URL}/youtube.svg`} />
        ) : null}
      </div>
      <div id="away" classname="logoScoreContainer">
        <span className="score">{match.awayScore}</span>
        <img src={`${process.env.PUBLIC_URL}/club.svg`} />
      </div>
    </Card>
  );
}
