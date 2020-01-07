import React from "react";

import styled from "styled-components";

import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Statue from "./components/statue";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: black;
`;

const Dashboard = styled.div`
  width: 90vw;
  height: 95vh;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(12, 8.33%);
  grid-template-rows: repeat(12, 8.33%);
  background: purple;
`;

export default function App2() {
  return (
    <Wrapper>
      <Dashboard>
        <Sidebar />
        <Header />
        <Statue nr={27} name={"Mateusz"} surname={"Puchalski"} />
      </Dashboard>
    </Wrapper>
  );
}
