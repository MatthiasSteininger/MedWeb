import React, { useEffect, useState } from 'react';

type RaceResult = {
  name: string;
  time: string;
  position: number;
};

const GridPage = () => {
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]); // Zustand mit spezifischem Typ

  const loadFileContent = () => {
    const filePath = 'C:\\_repos\\MedWeb\\src\\SpeedTracker\\Data\\data1.json';

    window.electronAddon.readFile(filePath)
      .then((content: string) => {
        const raceResultsLines = content.trim().split('\n').slice(0, 200);
        const localRaceResults = raceResultsLines.map((line) => JSON.parse(line) as RaceResult);
        setRaceResults(localRaceResults);
      })
      .catch((error: Error) => {
        console.error('Error reading file:', error);
      });
  };



  
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Grid View</h1>
      <p className="text-lg text-gray-600 mb-4">This will be the grid view. Customize as needed.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {raceResults.length > 0 ? (
          raceResults.map((result, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <p><strong>Result {index + 1}:</strong></p>
              <pre className="text-left text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No race results available.</p>
        )}
      </div>
    </div>
  );
};

export default GridPage;
