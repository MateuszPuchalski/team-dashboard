import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AvatarStyle = styled.img`
  width: 90%;

  padding: 0.5rem;
`;
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
    <AvatarStyle
      src={process.env.PUBLIC_URL + `/avatars/${name}${surname}.webp`}
      alt={`${name} ${surname}`}
    />
  );
}
