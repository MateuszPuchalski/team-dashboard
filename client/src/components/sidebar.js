import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "./avatar";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  grid-row: 1 / span 12;
  display: grid;
  grid-template-rows: auto, repeat(9, 8.33%);
`;

const Herb = styled.img`
  grid-row: 1/ 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Avatars = styled.div`
  object-fit: cover;
  overflow: scroll;
  overflow-x: hidden;
  grid-row-start: 3;
  grid-row-end: 10;

  display: grid;
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
        <Link to={`/players/${player.id}`}>
          <Avatar id={player.id} />
        </Link>
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
