import React, { useState, useEffect } from "react";

export default function useMatches(id) {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/players`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      });
  }, []);

  return [loading, players];
}
