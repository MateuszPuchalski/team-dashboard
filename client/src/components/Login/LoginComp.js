import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import TextMovingButton from "../TextMovingButton";

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

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(userActions.login(email, password));
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
      <TextMovingButton text="LOGIN" loading={loggingIn} />
    </Form>
  );
}
