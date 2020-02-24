import React, { useState, useEffect } from "react";

export default function useEvents(matchId) {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/events/match/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  return [loading, events];
}
