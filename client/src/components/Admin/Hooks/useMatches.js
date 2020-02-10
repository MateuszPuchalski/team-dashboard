import React, { useState, useEffect } from "react";

export default function useMatches(id) {
  const [matches, setMatches] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`api/matches`)
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  return [loading, matches];
}
