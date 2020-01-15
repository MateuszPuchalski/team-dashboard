import React, { useState, useEffect } from "react";
import styled from "styled-components";

// DO the fucking data fetching bitch
const Wrapper = styled.div`
  padding: 12px 18px;
  margin: 5px;
  background: #eeeeee;
  border-radius: 10px;
`;

const Card = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EfficiencyNumber = styled.div`
  display: flex;
  justify-content: center;
`;
const TableHeader = styled.thead`
  thead {
    display: table-header-group;
    width: 100%;
  }

  tr th {
    padding: 12px 8px;
  }
`;
const Rows = styled.table`
  border-collapse: collapse;
  display: table;
`;

const RowGroup = styled.tbody`
  tbody {
    display: table-row-group;
  }
`;

const Row = styled.tr`
  display: table-row;

  td {
    font-size: small;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    padding: 12px 8px;
    text-align: center;
  }
`;
//toDo add compare funcionality
// sorted func
export default function EfficiencyCard(props) {
  const [matches, setMatches] = useState();
  const [logs, setLogs] = useState();
  const [players, setPlayers] = useState();
  const [playerThrows, setPlayerThrows] = useState();
  const [teamEfficiency, setTeamEfficiency] = useState();

  const throwFilter = logs => {
    const throws = logs.filter(log => log.log === "throw");
    const attempts = throws.length;
    let made = 0;
    const playerThrows = {};

    throws.forEach(element => {
      if (playerThrows[element.player_id]) {
        if (element.throw_acc == 1) {
          made++;
          playerThrows[element.player_id].attempts++;
          playerThrows[element.player_id].made++;
        } else {
          playerThrows[element.player_id].attempts++;
        }
      } else {
        if (element.throw_acc == 1) {
          playerThrows[element.player_id] = {
            attempts: 1,
            made: 1
          };
        } else {
          playerThrows[element.player_id] = {
            attempts: 1,
            made: 0
          };
        }
      }
    });
    const teamEfficiency = ((made / attempts) * 100).toFixed(2);
    return { playerThrows, teamEfficiency };
  };

  const getMatches = () => {
    fetch("/matches")
      .then(res => res.json())
      .then(data => setMatches(data));
  };

  const getPlayers = async () => {
    const data = await fetch("/players")
      .then(res => res.json())
      .then(data => data);
    const players = {};
    data.forEach(item => {
      players[item.id] = item;
    });
    setPlayers(players);
  };

  const getLogs = async match => {
    let logs = [];
    if (match.length) {
      match.forEach(async item => {
        await fetch(`/matches/${item}`)
          .then(res => res.json())
          .then(data => {
            logs = logs.concat(data);
            setLogs(logs);
          });
      });
    } else {
      await fetch(`/matches/${match}`)
        .then(res => res.json())
        .then(data => {
          logs = logs.concat(data);
          console.log({ logggg: logs });
        });
    }
    console.log({ wtf: logs });
    setLogs(logs);
  };

  useEffect(() => {
    getMatches();
    getLogs(16);
    getPlayers();
  }, []);

  useEffect(() => {
    console.log({ matches: matches });
    console.log({ logs: logs });
    console.log({ playerThrows: playerThrows });
    console.log({ players: players });
    if (playerThrows) {
      const keyys = Object.keys(playerThrows);
      console.log(keyys);
      const sortedKeyys = keyys.sort(
        (a, b) => playerThrows[b].attempts - playerThrows[a].attempts
      );
      console.log(sortedKeyys);
    }
  }, [matches, logs, playerThrows, players]);

  useEffect(() => {
    if (logs) {
      const { playerThrows, teamEfficiency } = throwFilter(logs);
      setPlayerThrows(playerThrows);
      setTeamEfficiency(teamEfficiency);
    }
  }, [logs]);
  //toDO: Display attempts made and sort by procentage
  // add selecting by matches
  const wow = e => {
    console.log(e);
    console.log(`Hello ${e}`);
  };
  return (
    <Wrapper>
      <Card>
        <Header>
          <p>Efficiency</p>
          <p>Last Match</p>
        </Header>
        <EfficiencyNumber>
          <h1>{teamEfficiency}%</h1>
        </EfficiencyNumber>
        <Rows>
          <TableHeader>
            <Row>
              <th>Name</th>
              <th>%</th>
              <th>made/attempts</th>
            </Row>
          </TableHeader>
          <RowGroup>
            {playerThrows
              ? Object.keys(playerThrows)
                  .sort(
                    (a, b) =>
                      playerThrows[b].attempts - playerThrows[a].attempts
                  )
                  .map(item => (
                    <Row>
                      <td>
                        {players[item].name} {players[item].surname}
                      </td>
                      <td>
                        {(
                          (playerThrows[item].made /
                            playerThrows[item].attempts) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {playerThrows[item].made}/{playerThrows[item].attempts}
                      </td>
                    </Row>
                  ))
              : null}
          </RowGroup>
        </Rows>
      </Card>
    </Wrapper>
  );
}
