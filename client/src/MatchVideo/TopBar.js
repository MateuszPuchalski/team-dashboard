import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  return (
    <div>
      <Link to={`${location.pathname}/stats`}>Stats</Link>
    </div>
  );
}
