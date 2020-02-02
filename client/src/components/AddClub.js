import React, { useState, useEffect } from "react";

import { useAuth } from "../useAuth";

export default function AddClub() {
  const [competitions, setCompetitions] = useState();
  const auth = useAuth();
  const getCompetitions = () => {
    fetch("/api/competitions", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  useEffect(() => {
    console.log(competitions);
  }, [competitions]);

  const submit = e => {
    const data = {
      name: e.target.name.value,
      competition: e.target.competition.value,
      userid: auth.user._id
    };
    console.log({ data: data });
    fetch("/api/clubs/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log({ fromPOST: data });
      })
      .catch(err => console.error(err));
  };
  const renderCompetitions = competitions => {
    const arr = competitions.map((comp, i) => {
      console.log(comp);
      if (i === 0) {
        return (
          <option key={i} value={comp._id} defaultValue>
            {comp.name}
          </option>
        );
      }
      return (
        <option key={i} value={comp._id}>
          {comp.name}
        </option>
      );
    });

    return arr;
  };
  return (
    <form onSubmit={submit}>
      <label>
        Club name:
        <input type="text" name="name" />
      </label>
      <hr />
      <label>
        Competition:
        <select name="competition">
          {competitions ? renderCompetitions(competitions) : null}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
