import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { Link } from "react-router-dom";
import { useSpring, animated, interpolate } from "react-spring";
import TextMovingButton from "../TextMovingButton";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Page = styled.div`
  background: linear-gradient(
    180deg,
    rgba(254, 95, 100, 1) 0%,
    rgba(250, 25, 154, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background: #ffffff;
  width: 1200px;
  height: 800px;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  border-radius: 5px;
`;
const FormWrapper = styled.div`
  position: relative;
  padding: 50px;
  width: 40%;
  overflow: hidden;
`;
const FormNav = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  input {
    outline: 0;
  }
  span {
    padding: 5px;
    padding-right: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid black;
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid #00b4ff;
    }
  }
`;

const LoginRegisterWrapper = styled.div`
  position: absolute;
  width: 1320px;
  display: flex;
  left: -440px;
  .login {
    width: 440px;
  }
  .register {
    width: 440px;
  }
`;

const Presentation = styled.div`
  width: 60%;
  background: orange;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default function Login() {
  const [form, setForm] = useState("Login");
  const loginProps = useSpring(
    form == "Login"
      ? {
          from: { transform: "translateX(-270px)" },
          to: { transform: "translateX(490px)" },
        }
      : {
          from: { transform: "translateX(490px)" },
          to: { transform: "translateX(-270ox)" },
        }
  );

  const registerProps = useSpring(
    form == "Login"
      ? {
          from: { transform: "translateX(40px)" },
          to: { transform: "translateX(800px)" },
        }
      : {
          from: { transform: "translateX(800px)" },
          to: { transform: "translateX(40px)" },
        }
  );
  return (
    <Page>
      <Wrapper>
        <FormWrapper>
          <h1>{form} to Dash.</h1>
          <FormNav>
            <div
              onClick={() => {
                setForm("Login");
              }}
            >
              <span
                style={
                  form == "Login" ? { borderBottom: "2px solid #00b4ff" } : {}
                }
              >
                Login
              </span>
            </div>

            <div
              onClick={() => {
                setForm("Register");
              }}
            >
              <span
                style={
                  form == "Register"
                    ? { borderBottom: "2px solid #00b4ff" }
                    : {}
                }
              >
                Register
              </span>
            </div>
          </FormNav>
          <LoginRegisterWrapper>
            <animated.div className="login" style={loginProps}>
              <LoginComp />
            </animated.div>

            <animated.div className="register" style={registerProps}>
              <RegisterComp />
            </animated.div>
          </LoginRegisterWrapper>
        </FormWrapper>
        <Presentation>
          <img src={`${process.env.PUBLIC_URL}/abstractHandball.png`} />
        </Presentation>
      </Wrapper>
    </Page>
  );
}
