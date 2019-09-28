import React, { useState, useEffect } from "react";
import Logo from "./logo";
import GoalsPerMatch from "./goalsPerMatch";

export default function PhysicalForm(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    setLoading(true);
    const data = await fetch(`/matches/logos/${props.match.params.id}`);
    const items = await data.json();
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    setMatches(items.slice(-5));
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
    console.log(matches);
  }, [props.match.params.id]);

  return (
    <>
      <GoalsPerMatch id={props.match.params.id} />
      <div className="physicalForm">
        {!loading && matches.length > 4 ? (
          <>
            <Logo match={matches[0]} />
            <Logo match={matches[1]} />
            <Logo match={matches[2]} />
            <Logo match={matches[3]} />
            <Logo match={matches[4]} />
          </>
        ) : (
          <h3>LOADING...</h3>
        )}

        {/* <Logo match={matches[5]} /> */}
      </div>
    </>
  );
}
