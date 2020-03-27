import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

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

export default function Login({ setUser }) {
  let history = useHistory();
  const logIn = e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        window.sessionStorage.setItem("token", data.token);
        setUser(data.email);
        history.push("/profile");
      });
  };

  return (
    <WrapperWrapper>
      <LoginWrapper>
        <img src={`${process.env.PUBLIC_URL}/loginbackground.jpg`} />

        <form className="loginForm" onSubmit={logIn}>
          <h1>Welcome</h1>
          <div className="wrapInput">
            <input
              className="input1"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="wrapInput">
            <input
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
