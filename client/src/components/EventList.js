import React from "react";

export default function EventList(matchId) {
  const [events, setEvents] = useState();

  getEvents = matchId => {
    fetch(`/api/event/match/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      });
  };

  useEffect(() => {
    getEvents(matchId);
  }, [matchId]);

  return <div></div>;
}
