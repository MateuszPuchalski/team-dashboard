import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import "../main.css";

export default function Sidebar(props) {
  const [id, setId] = useState(1);
  // const [avatars, setAvatars] = useState([]);
  // console.log(id);
  // console.log(avatars);

  function renderAvatar(id) {
    return <Avatar id={id} />;
  }

  function oneUp() {
    setId(id + 1);
    console.log(id);
  }

  return (
    <div className="sidebar">
      <img src={process.env.PUBLIC_URL + `/herb.png`} id="herb" alt="herb" />
      {renderAvatar(id)}
      {renderAvatar(id + 1)}
      {renderAvatar(id + 2)}
      {renderAvatar(id + 3)}
      {renderAvatar(id + 4)}
      {renderAvatar(id + 5)}
      <img
        onClick={oneUp}
        src={process.env.PUBLIC_URL + `/arrow.png`}
        id="arrow"
        alt="arrow"
      />
    </div>
  );
}
