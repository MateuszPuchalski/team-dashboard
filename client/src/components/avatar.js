import React, { useState, useEffect } from "react";
import "../main.css";

export default function Avatar({ id }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const fetchData = async id => {
    const data = await fetch(`/players/${id}`);
    console.log(data);

    const items = await data.json();
    console.log({ avatar: items });
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
        src={process.env.PUBLIC_URL + `/avatars/${name}${surname}.webp`}
        alt={`${name} ${surname}`}
      />
    </div>
  );
}
