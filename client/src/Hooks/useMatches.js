import React, { useState, useEffect } from "react";

export default function useMatches(matchId) {
  const [matches, setMatches] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    if (matchId) {
      fetch(`/api/matches/${matchId}`)
        .then(res => res.json())
        .then(data => {
          setMatches(data);
          setLoading(false);
        });
    } else {
      fetch(`/api/matches`)
        .then(res => res.json())
        .then(data => {
          setMatches(data);
          setLoading(false);
        });
    }
  }, []);

  return [loading, matches];
}
