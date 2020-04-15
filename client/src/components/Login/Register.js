import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { Link } from "react-router-dom";

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
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: 5px;
`;
const FormWrapper = styled.div`
  padding: 50px;
  width: 40%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  .signin {
    color: #fff;
    background: rgb(0, 180, 255);
    background: radial-gradient(
      circle,
      rgba(0, 180, 255, 1) 50%,
      rgba(0, 160, 255, 1) 100%
    );
    margin-top: 15px;
    text-transform: uppercase;
    border: none;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    &:hover {
      cursor: pointer;
      background: red;
    }
  }
`;
const Inputs = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;

  .formGroup {
    position: relative;

    margin-top: 10px;

    .formField {
      border: 0;
      padding: 15px 0;
      background: whitesmoke;
      width: 100%;
      
      }
    }
  }
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
const Presentation = styled.div`
  width: 60%;
  background: orange;
  img {
    width: 100%;
    height: 100%;
  }
`;
export default function Login() {
  return (
    <Page>
      <Wrapper>
        <FormWrapper>
          <Form>
            <h1>Register to Dash.</h1>
            <FormNav>
              <span>
                <StyledLink to="/">Login</StyledLink>
              </span>
              <span>
                <StyledLink to="/register">Register</StyledLink>
              </span>
            </FormNav>
            <Inputs>
              <div className="formGroup">
                <input
                  className="formField"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="formGroup">
                <input
                  className="formField"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </Inputs>
            <button className="signin">REGISTER</button>
          </Form>
        </FormWrapper>
        <Presentation>
          <img src={`${process.env.PUBLIC_URL}/abstractHandball.png`} />
        </Presentation>
      </Wrapper>
    </Page>
  );
}
