import React, { useState, useEffect } from "react";

export default function usePlayers(id = null) {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`/api/players/${id}`)
        .then(res => res.json())
        .then(data => {
          setPlayers(data);
          setLoading(false);
        });
      return;
    }
    fetch(`/api/players`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      });
  }, []);

  return [loading, players];
}
