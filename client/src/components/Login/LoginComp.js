import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import TextMovingButton from "../TextMovingButton";
import { useHistory } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
    }
  }
`;

export default function Login() {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const [login, { data }] = useMutation(LOGIN);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login({
      variables: {
        email: email,
        password: password,
      },
    })
      .then((data) => {
        console.log({ FROMLOGIN: data });
        window.localStorage.setItem("token", "Bearer " + data.data.login.token);
        history.push(`/${data.data.login.userId}`);
      })
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Inputs>
        <div className="formGroup">
          <input
            onChange={handleChange}
            className="formField"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="formGroup">
          <input
            onChange={handleChange}
            className="formField"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
      </Inputs>
      <TextMovingButton text="LOGIN" />
    </Form>
  );
}
