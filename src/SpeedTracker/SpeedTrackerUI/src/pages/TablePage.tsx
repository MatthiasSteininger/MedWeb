import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaTrash, FaFire } from 'react-icons/fa';

const TablePage = () => {
  const [raceResults, setRaceResults] = useState(() => {
    const savedResults = localStorage.getItem('raceResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const [filters, setFilters] = useState({
    Id: '',
    Bib: '',
    TimingPoint: '',
    Result: '',
    Invalid: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false); // Zustand für das Bestätigungsfenster

  const loadFileContent = () => {
    const filePath = 'C:\\_repos\\MedWeb\\src\\SpeedTracker\\Data\\richtigeData.json';

    window.electronAddon
      .readFile(filePath)
      .then((content) => {
        const raceResultsLines = content.trim().split('\n').slice(0, 200);
        const localRaceResults = raceResultsLines.map((line) => JSON.parse(line));

        localStorage.setItem('raceResults', JSON.stringify(localRaceResults));
        setRaceResults(localRaceResults);
      })
      .catch((error) => {
        console.error('Error reading file:', error);
      });
  };

  const clearTable = () => {
    setRaceResults([]);
    localStorage.removeItem('raceResults');
    setShowConfirmation(false); // Bestätigungsfenster nach dem Löschen schließen
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(raceResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'race_results.xlsx');
  };

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const calculateRoundCounters = (results: any[]) => {
    const bibCounts = {};
    return results.map((item) => {
      bibCounts[item.Bib] = (bibCounts[item.Bib] || 0) + 1;
      return { ...item, RoundCounter: bibCounts[item.Bib] };
    });
  };

  const processedResults = calculateRoundCounters(raceResults);

  const filteredResults = processedResults.filter((item) =>
    Object.keys(filters).every((key) =>
      filters[key] ? item[key]?.toString().includes(filters[key]) : true
    )
  );

  return (
    <div className="p-6 px-16 flex flex-col bg-gray-900 min-h-screen text-white">
      <div className="flex gap-6 items-center mb-6">
        <h1 className="text-3xl font-extrabold text-red-500 flex items-center gap-2">
          <FaFire /> Feuerwehr Rennübersicht
        </h1>
        <button onClick={loadFileContent} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow">
          Daten laden
        </button>
        <button
          onClick={() => setShowConfirmation(true)} // Bestätigungsfenster anzeigen
          className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2"
        >
          <FaTrash /> Löschen
        </button>
        {raceResults.length > 0 && (
          <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
            <FaFileExcel /> Exportieren
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={`Filter nach ${key}`}
            value={filters[key]}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          />
        ))}
      </div>

      {filteredResults.length > 0 && (
        <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-red-600">
              {['No.', 'ID', 'Bib', 'TimingPoint', 'Result', 'Time', 'Invalid', 'Round Counter'].map((header) => (
                <th key={header} className="py-2 px-4 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.ID}</td>
                <td className="py-2 px-4 border">{item.Bib}</td>
                <td className="py-2 px-4 border">{item.TimingPoint}</td>
                <td className="py-2 px-4 border">{item.Result}</td>
                <td className="py-2 px-4 border">{item.Time}</td>
                <td className="py-2 px-4 border">{item.Invalid ? 'Ja' : 'Nein'}</td>
                <td className="py-2 px-4 border">{item.RoundCounter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Möchten Sie wirklich löschen?</h3>
            <div className="flex gap-4">
              <button
                onClick={clearTable}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Ja, löschen
              </button>
              <button
                onClick={() => setShowConfirmation(false)} 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;
