import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import { Link } from "react-router-dom";
import TextMovingButton from "../TextMovingButton";
import RegisterPlayerFields from "./RegisterPlayerFields";
import RolePicker from "./RolePicker";
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
  height: 100%;
  overflow: hidden;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  const [role, setRole] = useState("Select Role");
  const props = useSpring({
    from: {
      transform: "translateX(400px)",
    },
    to: {
      transform: "translateX(0)",
    },
  });
  return (
    <Page>
      <Wrapper>
        <FormWrapper>
          <h1>Register to Dash.</h1>
          <FormNav>
            <StyledLink to="/">
              <span>Login</span>
            </StyledLink>

            <StyledLink to="/register">
              <span>Register</span>
            </StyledLink>
          </FormNav>
          <animated.div style={props}>
            <Form>
              <RolePicker role={role} setRole={setRole} />
              {role == "Player" ? <RegisterPlayerFields /> : null}

              <TextMovingButton text="Register" />
            </Form>
          </animated.div>
        </FormWrapper>
        <Presentation>
          <img src={`${process.env.PUBLIC_URL}/abstractHandball.png`} />
        </Presentation>
      </Wrapper>
    </Page>
  );
}
