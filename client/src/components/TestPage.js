import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
// Open if user have not any clubs or do not belong to any

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;
export default function TestPage() {
  const { loading, error, data } = useQuery(CURRENT_USER);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Wrapper>
      <h1>BOOM</h1>
      <h1>BOOM</h1>
      <h1>BOOM</h1>

      <h1>{!loading ? data.currentUser.email : "NIE"}</h1>
    </Wrapper>
  );
}
