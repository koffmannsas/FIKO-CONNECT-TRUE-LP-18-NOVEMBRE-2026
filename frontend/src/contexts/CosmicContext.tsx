import React, { createContext, useContext, useState } from "react";

interface CosmicContextValue {
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
}

const CosmicContext = createContext<CosmicContextValue>({
  activeCardId: null,
  setActiveCardId: () => {},
});

export const CosmicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <CosmicContext.Provider value={{ activeCardId, setActiveCardId }}>
      {children}
    </CosmicContext.Provider>
  );
};

export const useCosmic = () => useContext(CosmicContext);
