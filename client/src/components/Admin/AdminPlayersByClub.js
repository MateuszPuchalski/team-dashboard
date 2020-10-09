import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const Wrapper = styled.div`
  margin: 10px;
  width: 500px;
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  h3 {
    text-align: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    padding: 10px;
  }
  label {
    display: flex;
    span {
      display: block;
      margin: 10px;
      text-align: center;
    }
    select {
      display: block;
      margin: auto;
      padding: 10px;
    }
  }
`;

const GET_CLUBS = gql`
  query {
    clubMany {
      id
      name
    }
  }
`;

const GET_PLAYERS = gql`
  query PlayerByClub($clubId: String!) {
    playerByClub(clubId: $clubId) {
      id
      name
    }
  }
`;

export default function AdminPlayersByClub() {
  const { error, loading, data } = useQuery(GET_CLUBS);
  const [players, setPlayers] = useState();
  const [selectedClub, setSelectedClub] = useState();

  useEffect(() => {
    console.log(selectedClub);
  }, [selectedClub]);

  const renderClubs = (clubs) => {
    const arr = clubs.map((club, i) => {
      return <option value={club.id}>{club.name}</option>;
    });
    return arr;
  };

  const handleChange = (event) => {
    console.log({ handleChange: event.target.value });
    setSelectedClub(event.target.value);
  };

  return (
    <Wrapper>
      <h3>Players</h3>
      <Form>
        <label>
          Club:
          <select value={selectedClub} onChange={handleChange}>
            {!loading ? renderClubs(data.clubMany) : null}
          </select>
        </label>
      </Form>
      <hr />
      <div>
        {/* <ul>
          {players
            ? players.map((player) => (
                <li key={player.id}>
                  {player.name} {player.position}
                </li>
              ))
            : null}
        </ul> */}
        <PlayersList clubId={selectedClub} />
      </div>
    </Wrapper>
  );
}

function PlayersList({ clubId }) {
  const { error, loading, data } = useQuery(GET_PLAYERS, {
    variables: {
      clubId: clubId,
    },
  });
  useEffect(() => {
    console.log(data);
  }, [loading]);
  if (error) return error.message;
  if (loading) return <h3>loading...</h3>;
  if (data) {
    return (
      <div>
        <ul>
          {data.playerByClub.map((player) => {
            return <li>{player.name}</li>;
          })}
        </ul>
      </div>
    );
  }
  return <h3>Waiting...</h3>;
}
