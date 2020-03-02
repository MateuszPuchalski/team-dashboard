import React, { useState, useEffect } from "react";

import useClubs from "../Hooks/useClubs";

export default function ClubSettings() {
  const [clubLoading, clubs] = useClubs({ clubId: "5e259ca1c60ff01770db40ff" });

  useEffect(() => {
    console.log(clubs);
  }, [clubs]);

  return <div>{clubs ? <img src={clubs.logo} /> : null}</div>;
}
