import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../useAuth";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Login(props) {
  const auth = useAuth();
  let history = useHistory();

  const submit = e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    auth.signin(data.email, data.password, () => {
      if (auth.user) history.push("/dashboard"); // This is wher heppens 2 click to log in
    });
  };
  useEffect(() => {
    console.log({ User: auth.user });
  }, [auth.user]);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {auth.user ? <h1>{auth.user.msg ? auth.user.msg : null}</h1> : null}
    </>
  );
}
