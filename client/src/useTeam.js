import React, { useState, useEffect, useContext, createContext } from "react";

const teamContext = createContext();

export function ProviderTeam({ children }) {
  const team = useProviderTeam(teamContext);
  return <teamContext.Provider value={team}>{children}</teamContext.Provider>;
}

export const useTeam = () => {
  return useContext(teamContext);
};

function useProviderTeam() {}
