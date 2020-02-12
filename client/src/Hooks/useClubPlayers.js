import React, { useState, useEffect } from "react";

export default function useClubPlayers(club) {
  const [clubPlayers, setPlayers] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/players/club/${club}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      });
  }, [club]);

  return [loading, clubPlayers];
}
