import React, { useState, useEffect } from "react";

export default function useCompetitions(id) {
  const [competitions, setCompetitions] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/competitions`)
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
        setLoading(false);
      });
  }, []);

  return [loading, competitions];
}
