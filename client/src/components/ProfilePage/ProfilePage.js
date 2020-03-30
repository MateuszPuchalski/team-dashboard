import React from "react";
import LogoutButton from "../LogutButton";
import styled from "styled-components";

const SeasonStats = styled.div`
  .stat {
    margin-bottom: 1rem;
    .statName {
    }
    .statNumber {
      font-weight: bold;
    }
  }
`;

const PlayerDescription = styled.div`
  display: grid;
  width: 25vw;
  height: 900px;
  grid-template-rows: 1fr 8fr 1fr;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  .name {
    grid-row: 1/2;
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center; */

    h2 {
      margin: 0;
    }
    h4 {
      margin: 0;
    }
  }
  .sylwetka {
    grid-row: 2/3;
    background: green;
    img {
      object-fit: scale-down;
    }
  }
  .metrics {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    grid-row: 3/4;
    background: blue;
    .number {
      font-size: 2rem;
      font-weight: bold;
    }
    .desc {
      text-align: center;
    }
  }
`;
export default function ProfilePage() {
  return (
    <>
      <PlayerDescription>
        <div className="name">
          <h2>Mateusz Puchalski</h2>
          <h4>Środkowy Rozgrywający</h4>
        </div>
        <div className="sylwetka">
          <img
            src={`${process.env.PUBLIC_URL}/statues/PlayerPlaceholder.png`}
          />
        </div>
        <div className="metrics">
          <div id="yr">
            <div className="number">24</div>
            <div className="desc">yr</div>
          </div>
          <div id="height">
            <div className="number">189</div>
            <div className="desc">cm</div>
          </div>
          <div id="weight">
            <div className="number">95</div>
            <div className="desc">kg</div>
          </div>
        </div>
      </PlayerDescription>
      <SeasonStats>
        <h3>SEASON STATS</h3>
        <div className="stat">
          <span className="statName">Appearances: </span>
          <span className="statNumber">12</span>
        </div>
        <div className="stat">
          <span className="statName">Goals: </span>
          <span className="statNumber">88</span>
        </div>
        <div className="stat">
          <span className="statName">Throws: </span>
          <span className="statNumber">120</span>
        </div>
      </SeasonStats>
      {/* <div>
        <h1>Profile Page</h1>
      </div>

      <LogoutButton /> */}
    </>
  );
}
