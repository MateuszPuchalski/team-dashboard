import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions";

/*
  TODO:
    - Change background img to something handball related
    - Add icons to email and password
    - Add some color transtion upon hover on login
*/
const WrapperWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: lightgreen;
`;

const LoginWrapper = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  margin: auto;
  padding-top: 10vh;
  box-sizing: border-box;
  border-radius: 10px;

  img {
    position: absolute;
    width: inherit;
    height: inherit;
    z-index: 0;
    border-radius: 10px;
  }
  h1 {
    z-index: 1;
  }

  .loginForm {
    position: absolute;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background: rgba(255, 255, 255, 0.5);
    height: inherit;
    width: 450px;

    input {
      border: none;
      outline: none;
    }
    .wrapInput {
      width: 100%;
      margin-bottom: 10px;
    }
    .input1 {
      box-sizing: border-box;
      font-size: 15px;
      line-height: 1.5;
      color: #666;
      display: block;
      margin: auto;
      width: 80%;
      background: #e6e6e6;
      height: 50px;
      border-radius: 25px;
      padding: 0 30px 0 68px;
    }

    .login {
      background: #57b846;
      margin-top: 15px;
      text-transform: uppercase;
      width: 80%;
      height: 50px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      &:hover {
        cursor: pointer;
        background: red;
      }
    }
  }
`;

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("WORK FROM OUTSIDE IF");
    console.log({ email: email, password: password });

    console.log("WORKWORK");
    dispatch(userActions.login(email, password));
  };

  return (
    <WrapperWrapper>
      <LoginWrapper>
        <img src={`${process.env.PUBLIC_URL}/loginbackground.jpg`} />

        <form className="loginForm" onSubmit={handleSubmit}>
          <h1>Welcome</h1>
          <div className="wrapInput">
            <input
              onChange={handleChange}
              className="input1"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="wrapInput">
            <input
              onChange={handleChange}
              className="input1"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <input className="login" type="submit" value="Login" />
        </form>
      </LoginWrapper>
    </WrapperWrapper>
  );
}
