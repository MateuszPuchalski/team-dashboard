import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import TextMovingButton from "../TextMovingButton";
import { useHistory } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function Login() {
  const history = useHistory();

  const [createUser, { data }] = useMutation(CREATE_USER);

  const handbleSubmit = (evt) => {
    evt.preventDefault();

    createUser({
      variables: {
        email: evt.target.email.value,
        password: evt.target.password.value,
      },
    })
      .then((data) => history.push("/matches"))
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  };

  return (
    <Form onSubmit={handbleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <TextMovingButton text={"REGISTER"} />
    </Form>
  );
}
