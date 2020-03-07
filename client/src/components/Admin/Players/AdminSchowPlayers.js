import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import usePlayers from "../../../Hooks/usePlayers";
import AdminAddPlayer from "../AdminAddPlayer";

const textPrimary = "white";
const textSecondary = "#ececec";
const bgPrimary = "#9FA2B2";
const bgSecondary = "#16262E";
const transitionSpeed = "200ms";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const PlayerTable = styled.div`
  background: ${bgPrimary};
  height: 100vh;
  overflow: scroll;
  hr {
    opacity: 0.5;
    margin: 0 1rem;
  }
  #tableHead {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5rem;
    opacity: 0.5;
    font-weight: bold;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  #tableRow {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 2rem 0;

    img {
      height: 5rem;
    }
    &:hover {
      background: #b3b09f;
    }
  }
  .tableCell {
    display: flex;
    justify-content: center;
    width: 20%;
    align-items: center;
    span {
      margin: auto;
    }

    #positionBox {
      height: 3rem;
      width: 3rem;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${bgSecondary};
      margin: auto;
    }
    #name {
      display: flex;
      justify-content: space-evenly;
    }
    #number {
      display: flex;
      justify-content: center;
    }
    #nr {
      font-size: 1.5rem;
      font-weight: bold;
      margin: auto 1.5rem;
    }
    #flag {
      height: 2rem;
    }
  }
`;

export default function AdminSchowPlayers() {
  const [loading, players] = usePlayers();

  return (
    <>
      {/* <AdminAddPlayer /> */}
      <PlayerTable>
        <div id="tableHead">
          <div className="tableCell">NR</div>
          <div className="tableCell">NAME</div>
          <div className="tableCell">DATE OF BIRTH</div>
          <div className="tableCell">POSITION</div>
          <div className="tableCell">RATING</div>
        </div>
        <hr />
        <div id="tableBody">
          {players
            ? players.map(player => (
                <StyledLink to={`/admin/players/${player._id}`}>
                  <div id="tableRow">
                    <div className="tableCell" id="number">
                      <img
                        src={`${process.env.PUBLIC_URL}/poland.svg`}
                        id="flag"
                      />
                      <span id="nr">{player.jerseyNumber}</span>
                    </div>
                    <div className="tableCell" id="name">
                      <img src={player.avatar} alt="NONE" />
                      <span>{player.name}</span>
                    </div>
                    <div className="tableCell" id="date">
                      <span>04-03-1996</span>
                    </div>
                    <div className="tableCell" id="position">
                      <div id="positionBox">
                        <span>{player.position}</span>
                      </div>
                    </div>
                    <div className="tableCell" id="rating">
                      <span>Rating</span>
                    </div>
                  </div>
                </StyledLink>
              ))
            : null}
        </div>
      </PlayerTable>
    </>
  );
}
