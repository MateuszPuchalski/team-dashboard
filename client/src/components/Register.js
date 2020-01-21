import React, { useEffect, useState } from "react";

export default function Register() {
  const submit = e => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    console.log(data);

    fetch("/api/users/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  //   fetch("/matches/matchLog/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     },
  //     body: JSON.stringify(data)
  //   });

  return (
    <form onSubmit={submit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
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
  );
}
