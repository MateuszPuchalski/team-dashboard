import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../useAuth";
import AddClub from "./AddClub";
const Wrapper = styled.div``;

export default function Club() {
  const [club, setClub] = useState([]);
  const auth = useAuth();

  const getClub = () => {
    fetch(`/api/clubs/${auth.user._id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setClub(data);
        } else {
          return;
        }

        console.log(data);
      });
  };

  useEffect(() => {
    if (auth.user) getClub();
  }, []);

  return (
    <Wrapper>
      <h1>Club</h1>
      {club.length == 0 ? <AddClub /> : club[0].name}
    </Wrapper>
  );
}
