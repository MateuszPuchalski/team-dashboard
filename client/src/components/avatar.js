import React, { useState, useEffect } from "react";
import "../main.css";
import { Link } from "react-router-dom";

export default function Avatar({ id }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const fetchData = async id => {
    const data = await fetch(`/players/${id}`);
    const items = await data.json();
    setName(items[0].name);
    setSurname(items[0].surname);
  };
  useEffect(() => {
    fetchData(id);
  });

  // console.log(window.location.href[window.location.href.length - 1]);
  // let classNames = "sidebar__item";
  // console.log(this.state.id);
  // if (
  //   window.location.href[window.location.href.length - 1] == this.state.id
  // ) {
  //   classNames += " avatarSelected";
  // }
  return (
    <div className={"sidebar__item"}>
      <img
        src={process.env.PUBLIC_URL + `/avatars/${name}${surname}.png`}
        alt={`${name} ${surname}`}
      />
    </div>
  );
}
