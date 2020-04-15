import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { Link } from "react-router-dom";
import { useSpring, animated, interpolate } from "react-spring";

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

    font-weight: bold;
    background: rgb(0, 180, 255);
    background: radial-gradient(
      circle,
      rgba(0, 180, 255, 1) 50%,
      rgba(0, 160, 255, 1) 100%
    );
    margin-top: 15px;
    text-transform: uppercase;
    transition: box-shadow 500ms, font-size 500ms;
    border: none;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    &:hover {
      cursor: pointer;
      .loginText {
      }
    }
    .loginText {
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
  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0],
  }));

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("WORK FROM OUTSIDE IF");
    console.log({ email: email, password: password });

    console.log("WORKWORK");
    dispatch(userActions.login(email, password));
  };
  useEffect(() => {
    console.log({ fromEffect: xy });
  }, []);
  return (
    <Page>
      <Wrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <h1>Login to Dash.</h1>
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
            <button
              onMouseMove={(evt) => {
                const { clientX, clientY } = evt;
                const {
                  left,
                  top,
                  width,
                  height,
                } = evt.target.getBoundingClientRect();
                const x = clientX - left - width / 2;
                const y = clientY - top - height / 2;
                console.log({ evt: evt.target.getBoundingClientRect() });
                set({ xy: [x, y] });
              }}
              onMouseLeave={() => set({ xy: [0, 0] })}
              className="signin"
            >
              <animated.span
                style={{
                  transform: xy.interpolate(
                    (x, y) => `translate(${x / 10}px,${y / 10}px)`
                  ),
                }}
                className="loginText"
              >
                LOGIN
              </animated.span>
            </button>
          </Form>
        </FormWrapper>
        <Presentation>
          <img src={`${process.env.PUBLIC_URL}/abstractHandball.png`} />
        </Presentation>
      </Wrapper>
    </Page>
  );
}
