import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  // let { id } = useParams();
  return (
    <div className="header">
      <div>OVERVIEW</div>

      <div>TRAINING</div>
      <div>
        <Link to={`/stats/1`}>STATS</Link>
      </div>

      <div>TRANSFERS</div>
      <div>REPORTS</div>
    </div>
  );
}
