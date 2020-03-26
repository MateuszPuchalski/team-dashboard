import React, { useEffect, useState } from "react";

import { useHistory, Redirect } from "react-router-dom";
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
    <>
      <h1>Login</h1>
      <form onSubmit={logIn}>
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
      <button>Submit</button>
    </>
  );
}
