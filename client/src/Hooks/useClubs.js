import React, { useState, useEffect } from "react";

export default function useClubs({ clubId }) {
  const [clubs, setClubs] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    if (clubId) {
      fetch(`/api/clubs/${clubId}`)
        .then(res => res.json())
        .then(data => {
          setClubs(data);
          setLoading(false);
        });
      return;
    } else {
      fetch(`/api/clubs`)
        .then(res => res.json())
        .then(data => {
          setClubs(data);
          setLoading(false);
        });
    }
  }, []);

  return [loading, clubs];
}
