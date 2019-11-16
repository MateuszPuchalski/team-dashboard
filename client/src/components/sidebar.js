import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import "../main.css";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [id, setId] = useState(1);

  function renderAvatar(id) {
    return (
      <Link to={`/players/${id}`}>
        <Avatar id={id} />
      </Link>
    );
  }

  return (
    <div className="sidebar">
      <img src={process.env.PUBLIC_URL + `/herb.webp`} id="herb" alt="herb" />
      <div className="avatars">
        {renderAvatar(id)}
        {renderAvatar(id + 1)}
        {renderAvatar(id + 2)}
        {renderAvatar(id + 3)}

        {renderAvatar(id + 5)}
        {renderAvatar(id + 6)}
        {renderAvatar(id + 7)}
        {renderAvatar(id + 8)}
        {renderAvatar(id + 9)}
        {renderAvatar(id + 10)}
        {renderAvatar(id + 11)}
        {renderAvatar(id + 12)}
        {renderAvatar(id + 13)}
        {renderAvatar(id + 14)}
        {renderAvatar(id + 15)}
        {renderAvatar(id + 16)}
        {renderAvatar(id + 17)}
      </div>

      <img src={process.env.PUBLIC_URL + `/arrow.png`} id="arrow" alt="arrow" />
    </div>
  );
}
