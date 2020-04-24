import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";

import TextMovingButton from "../TextMovingButton";
import RegisterPlayerFields from "./RegisterPlayerFields";
import RolePicker from "./RolePicker";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function Login() {
  const [role, setRole] = useState("Select Role");
  const dispatch = useDispatch();

  const loggingIn = useSelector((state) => state.registration.loggingIn);

  const handbleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      userActions.register({
        role,
        password: evt.target.password.value,
        email: evt.target.email.value,
      })
    );
  };

  return (
    <Form onSubmit={handbleSubmit}>
      <RolePicker role={role} setRole={setRole} />
      {role == "Player" ? <RegisterPlayerFields /> : null}
      <TextMovingButton text="Register" loading={loggingIn} />
    </Form>
  );
}
