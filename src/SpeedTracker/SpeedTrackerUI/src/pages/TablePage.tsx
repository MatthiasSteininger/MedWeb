import React, { useEffect, useState } from 'react';

const TablePage = () => {
  // Initialize state from localStorage or empty array
  const [raceResults, setRaceResults] = useState(() => {
    const savedResults = localStorage.getItem('raceResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  useEffect(() => {
    // Speichert den Zustand von raceResults im localStorage, wenn sich der Zustand ändert
    if (raceResults.length > 0) {
      localStorage.setItem('raceResults', JSON.stringify(raceResults));
    }
  }, [raceResults]);

  const loadFileContent = () => {
    const filePath = 'C:\\_repos\\MedWeb\\src\\SpeedTracker\\Data\\data1.json';

    window.electronAddon.readFile(filePath).then((content: string) => {
      const raceResultsLines = content.trim().split('\n').slice(0, 200);
      const localRaceResults: any = raceResultsLines.map((line) => JSON.parse(line));
      setRaceResults(localRaceResults);
    }).catch((error: Error) => {
      console.error('Error reading file:', error);
    });
  };

  const clearTable = () => {
    setRaceResults([]);  // Leert die Tabelle, indem der Zustand auf ein leeres Array gesetzt wird
    localStorage.removeItem('raceResults');  // Entfernt die Daten aus dem localStorage
    console.log('Table cleared');
  };

  return (
    <div className="p-6 px-16 flex flex-col">
      <div className='flex gap-10'>
        <h1 className="text-2xl font-bold mb-4">Table Display</h1>
        <button
          onClick={loadFileContent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Parse and Display Data
        </button>

        <button 
          onClick={clearTable}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
        >
          Delete Data
        </button>
      </div>

      {raceResults.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">No.</th>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Bib</th>
              <th className="py-2 px-4 border">TimingPoint</th>
              <th className="py-2 px-4 border">Result</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Invalid</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map((item: any, index: number) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-t`}>
                <td className='py-2 px-4 border'>{index + 1}</td>
                <td className="py-2 px-4 border">{item.ID}</td>
                <td className="py-2 px-4 border">{item.Bib}</td>
                <td className="py-2 px-4 border">{item.TimingPoint}</td>
                <td className="py-2 px-4 border">{item.Result}</td>
                <td className="py-2 px-4 border">{item.Time}</td>
                <td className="py-2 px-4 border">{item.Invalid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablePage;
