import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  left: 5rem;
`;

const GET_CLUBS = gql`
  query clubs {
    clubMany {
      id
      name
    }
  }
`;

export default function ClubsList() {
  const { loading, error, data } = useQuery(GET_CLUBS);
  useEffect(() => {
    if (data) {
      console.log(data.clubMany);
    }
  }, [data]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <Wrapper>
      <h1>BOOM</h1>
      <ul>
        {data.clubMany.map(({ name, id }) => (
          <li>
            <Link to={`clubs/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
