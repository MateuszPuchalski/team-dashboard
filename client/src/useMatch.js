import React, { useState, useEffect, useContext, createContext } from "react";

const matchContext = createContext();

export function ProviderMatch({ children }) {
  const match = useProvideMatch();

  return (
    <matchContext.Provider value={match}>{children}</matchContext.Provider>
  );
}

export const useMatch = () => {
  return useContext(matchContext);
};

function useProvideMatch() {
  const [matchId, setMatchId] = useState();
}
