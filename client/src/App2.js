import React from "react";

import styled from "styled-components";

import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Statue from "./components/statue";
import background from "./images/backgroundmat.webp";
import StatPanel from "./components/statPanel";
import Chart from "./components/chart";
import EfficiencyCard from "./components/EfficiencyCard";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(${background});
  background-size: cover;
  overflow: hidden;
`;

const Dashboard = styled.div`
  width: 90vw;
  height: 90vh;
  margin: auto;
  margin-top: 2vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  background: #333333;
  /* background: linear-gradient(
    to top,
    #dd1818,
    #333333
  );  */
  background: linear-gradient(to top, #333333, #dd1818);

  border-radius: 10px;
  box-shadow: 3px 3px 10px;

  font-family: "Alata", sans-serif;
`;

export default function App2() {
  return (
    <Wrapper>
      <Dashboard>
        {/* <Sidebar />
        <Header />
        <Statue nr={13} name={"Patrycjusz"} surname={"Jaskurzynski"} />
        <Chart id={1} /> */}
        {/* <StatPanel /> */}

        <EfficiencyCard match={15} />
      </Dashboard>
    </Wrapper>
  );
}
