import React, { useState, useEffect } from "react";

export default function useClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const data = await (await fetch(`/api/clubs`)).json();
        console.log(data);
        setClubs(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClubs();
  }, []);

  return [loading, clubs];
}
