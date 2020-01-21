import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../useAuth";

const Wrapper = styled.div``;

export default function Club() {
  const [club, setClub] = useState();
  const auth = useAuth();

  const getClub = () => {
    fetch(`/api/clubs/${auth.user.user.id}`)
      .then(res => res.json())
      .then(data => {
        setClub(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <Wrapper>
      <h1>Club</h1>
      {club ? club[0].name : "null"}
    </Wrapper>
  );
}
