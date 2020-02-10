import React, { useState, useEffect } from "react";

export default function useClubs(id) {
  const [clubs, setClubs] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/clubs`)
      .then(res => res.json())
      .then(data => {
        setClubs(data);
        setLoading(false);
      });
  }, []);

  return [loading, clubs];
}
