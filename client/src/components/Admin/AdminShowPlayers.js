import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
    diplay: flex;
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
export default function AdminShowPlayers() {
  const [players, setPlayers] = useState();
  const [clubs, setClubs] = useState();
  const [selectedClub, setSelectedClub] = useState();

  const getClubs = () => {
    fetch("/api/clubs", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setClubs(data);
      })
      .catch(err => console.error(err));
  };

  const getPlayers = clubId => {
    fetch(`/api/players/club/${clubId}`)
      .then(res => res.json())
      .then(players => setPlayers(players));
  };

  const renderClubs = clubs => {
    const arr = clubs.map((club, i) => {
      return (
        <option id={club._id} value={club._id}>
          {club.name}
        </option>
      );
    });
    return arr;
  };

  const selectClubId = e => {
    setSelectedClub(e.target.value);
  };

  useEffect(() => {
    console.log(selectedClub);
  }, [selectedClub]);

  useEffect(() => {
    getPlayers(selectedClub);
  }, [selectedClub]);

  useEffect(() => {
    getPlayers();
    getClubs();
  }, []);

  return (
    <Wrapper>
      <h3>Players</h3>
      <Form>
        <label>
          Club:
          <select onChange={selectClubId} name="club">
            {clubs ? renderClubs(clubs) : null}
          </select>
        </label>
      </Form>
      <hr />
      <div>
        <ul>
          {players
            ? players.map(player => (
                <li key={player.id}>
                  {player.name} {player.position}
                </li>
              ))
            : null}
        </ul>
      </div>
    </Wrapper>
  );
}
