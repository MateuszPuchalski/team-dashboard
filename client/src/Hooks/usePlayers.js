import React, { useState, useEffect } from "react";

export default function usePlayers(clubId) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const players = await (
          await fetch(`/api/players/club/${clubId}`)
        ).json();
        console.log(players);
        setPlayers(players);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayers();
  }, [clubId]);

  return [loading, players];
}
