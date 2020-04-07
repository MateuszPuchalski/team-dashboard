import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  img {
    height: 100%;
  }
`;

export default function Silhouette() {
  return (
    <Wrapper>
      <img src={`${process.env.PUBLIC_URL}/statues/MateuszPuchalski.webp`} />
    </Wrapper>
  );
}
