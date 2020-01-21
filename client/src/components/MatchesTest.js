import React, { useState, useEffect } from "react";

export default function MatchesTest() {
  const [matches, setMatches] = useState();
  const getClubs = async () => {
    console.log("boom");
    const response = await fetch("/api/clubs");
    const data = await response.json();
    setMatches(data);
  };

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  return <button onClick={getClubs}>FETCH</button>;
}
