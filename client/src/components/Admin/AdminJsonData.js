import React, { useState } from "react";
import testData from "./testData";
import styled from "styled-components";

const Wrapper = styled.div``;
const Data = styled.pre`
  margin: 10px;
  padding: 10px;
  overflow: scroll;
  height: 500px;
`;
export default function AdminJsonData() {
  const [pointer, setPointer] = useState(0);

  const data = testData;

  const point = () => {
    setPointer(pointer + 1);
  };
  return (
    <Wrapper>
      <Data>
        <code>{JSON.stringify(data[pointer], null, 2)}</code>
      </Data>
      {/* <button onClick={point(-1)}>{"<"}</button> */}
      <button onClick={point}>{">"}</button>
    </Wrapper>
  );
}
