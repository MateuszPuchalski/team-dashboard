import React, { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login(props) {
  const auth = useAuth();
  let history = useHistory();
  const [user, setUser] = useState("Placholder");
  const submit = e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    auth.signin(data.email, data.password);
    if (auth.user) history.push("/dashboard");
  };

  const checkAuth = e => {
    fetch("/api/auth")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUser(data.username);
      });
  };

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
      <button onClick={checkAuth}>{user}</button>
      {auth.user ? <h1>{auth.user.msg ? auth.user.msg : null}</h1> : null}
    </>
  );
}
