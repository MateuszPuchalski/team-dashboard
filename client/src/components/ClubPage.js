import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  left: 5rem;
`;

const GET_PLAYERS = gql`
  query players($clubId: String!) {
    playerByClub(clubId: $clubId) {
      id
      name
    }
  }
`;

export default function ClubPage() {
  const { clubId } = useParams();
  let { path, url } = useRouteMatch();
  const { loading, error, data } = useQuery(GET_PLAYERS, {
    variables: {
      clubId: clubId,
    },
  });
  useEffect(() => {
    if (data) {
      console.log(data.playerByClub);
    }
  }, [data]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <Wrapper>
      <ul>
        {data.playerByClub.map(({ name, id }) => (
          <li>
            <Link to={`${url}/player/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
