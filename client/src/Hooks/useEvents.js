import React, { useState, useEffect } from "react";

export default function useEvents({ matchId = null, playerId = null }) {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState();
  console.log();
  useEffect(() => {
    setLoading(true);

    if (!matchId && !playerId) {
      fetch(`/api/events`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
          setLoading(false);
        });
      return;
    }

    if (matchId && playerId) {
      fetch(`/api/events/player/${playerId}/match/${matchId}/`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
          setLoading(false);
        });
      return;
    }

    if (matchId) {
      fetch(`/api/events/match/${matchId}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
          setLoading(false);
        });
      return;
    }

    if (playerId) {
      fetch(`/api/events/player/${playerId}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
          setLoading(false);
        });
      return;
    }
  }, []);

  return [loading, events];
}
