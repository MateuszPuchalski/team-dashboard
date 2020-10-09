import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const textPrimary = "white";
const textSecondary = "#fff";
const bgPrimary = "#EAF2E8";
const bgSecondary = "#1B2E33";
const transitionSpeed = "200ms";

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
    margin: 0 1rem;
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
  transition: ${transitionSpeed} width ease-in-out;
  background: linear-gradient(
    180deg,
    rgba(254, 95, 100, 1) 0%,
    rgba(250, 25, 154, 1) 100%
  );
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
      &:first-child {
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 1rem;
        text-align: center;
        color: ${textSecondary};
        background: radial-gradient(
          circle,
          rgba(0, 180, 255, 1) 50%,
          rgba(0, 160, 255, 1) 100%
        );
        font-size: 1.2rem;
        letter-spacing: 0.3ch;
        width: 100%;

        span {
          display: inline;
          position: absolute;
          left: -999px;
          transition: ${transitionSpeed};
        }
        img {
          width: 3rem;
          min-width: 3rem;
          transform: rotate(0deg);
          transition: ${transitionSpeed};
        }
      }
    }
  }

  &:hover {
    width: 16rem;

    li:first-child {
      span {
        left: 0px;
      }
      img {
        transform: rotate(-180deg);
        margin-left: 11rem;
      }
    }
    ${StyledLink} {
      span {
        display: inline;
      }
    }
  }
`;
export default function Sidebar() {
  const location = useLocation();

  console.log({ locationURL: location });
  return (
    <Navbar>
      <ul>
        <li>
          <StyledLink to={`/`}>
            <img src={`${process.env.PUBLIC_URL}/arrows.svg`} />
            <span>Dashboard</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink
            style={
              location.pathname.match("/players/*")
                ? { borderLeft: "0.5rem solid red" }
                : null
            }
            to={`/players`}
          >
            <img src={`${process.env.PUBLIC_URL}/players.svg`} />
            <span>Players</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            style={
              location.pathname.match("/matches/*")
                ? { borderLeft: "0.5rem solid red" }
                : null
            }
            to={`/matches`}
          >
            <img src={`${process.env.PUBLIC_URL}/matches.svg`} />
            <span>Matches</span>
          </StyledLink>
          <StyledLink
            style={
              location.pathname.match("/clubs/*")
                ? { borderLeft: "0.5rem solid red" }
                : null
            }
            to={`/clubs`}
          >
            <span>Clubs</span>
          </StyledLink>
        </li>
      </ul>
    </Navbar>
  );
}
