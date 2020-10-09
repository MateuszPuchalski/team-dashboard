import React from "react";
import { gql, useQuery } from "@apollo/client";

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
    }
  }
`;
export default function CurrentUser() {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading) return "Loading...";
  if (error) {
    console.log(error);
    return "ERROR";
  }
  console.log(data);
  return <div>{data.currentUser.email}</div>;
}
