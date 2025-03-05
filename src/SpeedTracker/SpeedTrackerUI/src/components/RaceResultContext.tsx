import React, { createContext, useState, useContext } from 'react';

type RaceResult = {
  name: string;
  time: string;
  position: number;
};

// Erstellen des Kontextes für die RaceResult-Daten
const RaceResultsContext = createContext<{ raceResults: RaceResult[], setRaceResults: React.Dispatch<React.SetStateAction<RaceResult[]>> } | undefined>(undefined);

// Context Provider-Komponente
export const RaceResultsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);

  return (
    <RaceResultsContext.Provider value={{ raceResults, setRaceResults }}>
      {children}
    </RaceResultsContext.Provider>
  );
};

// Custom Hook für den Zugriff auf den Context
export const useRaceResults = () => {
  const context = useContext(RaceResultsContext);
  if (!context) {
    throw new Error('useRaceResults must be used within a RaceResultsProvider');
  }
  return context;
};
