import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useMatches from "../Hooks/useMatches";
import useEvents from "../Hooks/useEvents";
import useThrowEfficiency from "../Hooks/useThrowEfficiency";

import { useParams } from "react-router-dom";
// DO the fucking data fetching bitch
const Wrapper = styled.div`
  padding: 12px 18px;
  margin: 5px;
  background: #1b2e33;
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
export default function EfficiencyCard() {
  const { matchId } = useParams();
  // List of players [{id,name,throwCount, madeCount, missCount, turnoversCount},...]
  const [throwEfficiencyLoading, throwEfficiency] = useThrowEfficiency({
    matchId,
  });

  const [total, setTotal] = useState(0);

  const totalEfficiency = (data) => {
    const result = data.reduce(
      (acc, cur) => {
        acc.made += cur.madeThrows;
        acc.total += cur.throwCount;
        return acc;
      },
      { made: 0, total: 0 }
    );
    return Math.round((result.made / result.total) * 100);
  };

  return (
    <Wrapper>
      <Card>
        <Header>
          <p>Efficiency</p>
          <p>Last Match</p>
        </Header>
        <EfficiencyNumber>
          <h1>{totalEfficiency(throwEfficiency)}%</h1>
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
            {throwEfficiency.map((player) => {
              return (
                <Row>
                  <td>{player.name}</td>
                  <td>
                    {Math.round((player.madeThrows / player.throwCount) * 100)}%
                  </td>
                  <td>
                    {player.madeThrows}/{player.throwCount}
                  </td>
                </Row>
              );
            })}
          </RowGroup>
        </Rows>
      </Card>
    </Wrapper>
  );
}
