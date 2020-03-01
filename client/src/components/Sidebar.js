import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "./avatar";
import { Link, useRouteMatch } from "react-router-dom";

const textPrimary = "#b6b6b6";
const textSecondary = "#ececec";
const bgPrimary = "#23232e";
const bgSecondary = "#141418";
const transitionSpeed = "400ms";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  height: 5rem;
  color: ${textPrimary};
  text-decoration: none;
  filter: grayscale(100%) opacity(0.5);
  transition: ${transitionSpeed};
  img {
    width: 3rem;
    min-width: 3rem;
    margin: 0 1.5rem;
  }
  span {
    display: none;
    margin-left: 1rem;
  }
  &:hover {
    filter: grayscale(0%) opacity(1);
    background: ${bgSecondary};
    color: ${textSecondary};
    img {
      filter: invert(10%) sepia(38%) saturate(7146%) hue-rotate(354deg)
        brightness(100%) contrast(85%);
    }
  }
`;

const Navbar = styled.nav`
  display: flex;
  position: fixed;
  background: red;
  top: 0;
  width: 5rem;
  height: 100vh;
  z-index: 100;
  transition: 400ms width ease;
  background-color: ${bgPrimary};
  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    li {
      width: 100%;
    }
  }

  &:hover {
    width: 16rem;

    ${StyledLink} {
      span {
        display: inline;
      }
    }
  }
`;
export default function Sidebar() {
  const match = useRouteMatch();
  return (
    <Navbar>
      <ul>
        <li>Dashboard</li>
        <li>
          <StyledLink to={`${match.url}/club`}>Club</StyledLink>
        </li>
        <li>
          <StyledLink to={`${match.url}/players`}>
            <img src={`${process.env.PUBLIC_URL}/players.svg`} />
            <span>Players</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to={`${match.url}/matches`}>
            <img src={`${process.env.PUBLIC_URL}/matches.svg`} />
            <span>Matches</span>
          </StyledLink>
        </li>
      </ul>
    </Navbar>
  );
}
