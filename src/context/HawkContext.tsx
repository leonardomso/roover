import React, { useContext } from "react";

import useHawk from "../hooks/useHawk";

const HawkContext = React.createContext(undefined as any);

const HawkProvider = ({ children }: any) => {
  const { play, handlePlay } = useHawk();

  const value = [play, handlePlay];

  return <HawkContext.Provider value={value}>{children}</HawkContext.Provider>;
};

const useHawkContext = () => {
  const context = useContext(HawkContext);
  if (context === undefined) {
    throw new Error("useHawk can only be used inside HawkProvider");
  }
  return context;
};

export { HawkProvider, useHawkContext };
