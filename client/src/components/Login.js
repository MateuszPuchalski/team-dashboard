import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
export default function Login(props) {
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
      .then(token => {
        window.sessionStorage.setItem("token", token);
      });
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("im ind ROGER!!");
          console.log(data);
        });
    }
  }, []);

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
