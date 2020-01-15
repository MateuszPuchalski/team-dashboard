import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "./avatar";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-row: 1 / span 12;
  display: grid;
  grid-template-rows: repeat(12, minmax(0, 1fr));
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Herb = styled.img`
  grid-row: 1/ 3;
  width: 7vw;
  height: 100%;
  justify-content: center;
  align-self: center;
  object-fit: contain;
  overflow: hidden;
`;

const Avatars = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  grid-row-start: 3;
  grid-row-end: 13;
  max-width: 100%;
  height: auto;
  width: 7vw;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-clip: content-box; /* THIS IS IMPORTANT */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2d1b34;
    border-radius: 10px;
    border: 3px solid transparent;

    background-clip: content-box;
  }
`;

export default function Sidebar(props) {
  const [id, setId] = useState(1);
  const [players, setPlayers] = useState([]);
  const getAllPlayers = async () => {
    const data = await fetch("/players");
    const items = await data.json();

    setPlayers(items);
  };

  const renderAvatar = players => {
    const linkedPlayers = players.map(player => {
      return (
        // <Link
        //   to={`/players/${player.id}`}
        // >
        <Avatar id={player.id} />
        // </Link>
      );
    });

    return linkedPlayers;
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <Wrapper>
      <Herb src={process.env.PUBLIC_URL + `/herb.webp`} id="herb" alt="herb" />
      <Avatars>
        {players[0] ? renderAvatar(players) : <h3>LOADING...</h3>}
      </Avatars>
    </Wrapper>
  );
}
