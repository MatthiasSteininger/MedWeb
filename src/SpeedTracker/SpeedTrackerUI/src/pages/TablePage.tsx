import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

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

  const loadFileContent = () => {
    const filePath = 'C:\\_repos\\MedWeb\\src\\SpeedTracker\\Data\\data1.json';

    window.electronAddon
      .readFile(filePath)
      .then((content: string) => {
        const raceResultsLines = content.trim().split('\n').slice(0, 200);
        const localRaceResults: any = raceResultsLines.map((line) => JSON.parse(line));

        localStorage.setItem('raceResults', JSON.stringify(localRaceResults));
        setRaceResults(localRaceResults);
      })
      .catch((error: Error) => {
        console.error('Error reading file:', error);
      });
  };

  const clearTable = () => {
    setRaceResults([]);
    localStorage.removeItem('raceResults');
    console.log('Table cleared');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(raceResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');

    XLSX.writeFile(wb, 'race_results.xlsx');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Funktion zur Berechnung der Rundenzähler für jede Bib
  const calculateRoundCounters = (results: any[]) => {
    const bibCounts: Record<string, number> = {};

    return results.map((item) => {
      bibCounts[item.Bib] = (bibCounts[item.Bib] || 0) + 1;
      return {
        ...item,
        RoundCounter: bibCounts[item.Bib],
      };
    });
  };

  const processedResults = calculateRoundCounters(raceResults);

  const filteredResults = processedResults.filter((item: any) => {
    return (
      (filters.Id ? item.ID.toString().includes(filters.Id) : true) &&
      (filters.Bib ? item.Bib.toString().includes(filters.Bib) : true) &&
      (filters.TimingPoint ? item.TimingPoint.toString().includes(filters.TimingPoint) : true) &&
      (filters.Result ? item.Result.toString().includes(filters.Result) : true) &&
      (filters.Invalid ? item.Invalid.toString().includes(filters.Invalid) : true)
    );
  });

  return (
    <div className="p-6 px-16 flex flex-col">
      <div className="flex gap-10">
        <h1 className="text-2xl font-bold mb-4">Table Display</h1>
        <button
          onClick={loadFileContent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Parse and Display Data
        </button>

        <button
          onClick={clearTable}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Delete Data
        </button>

        {raceResults.length > 0 && (
          <button
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Export to Excel (.xlsx)
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="Id"
          placeholder="Filter by Id"
          value={filters.Id}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="Bib"
          placeholder="Filter by Bib"
          value={filters.Bib}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="TimingPoint"
          placeholder="Filter by TimingPoint"
          value={filters.TimingPoint}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="Result"
          placeholder="Filter by Result"
          value={filters.Result}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="Invalid"
          placeholder="Filter by Invalid"
          value={filters.Invalid}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {filteredResults.length > 0 && (
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
              <th className="py-2 px-4 border">Round Counter</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((item: any, index: number) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-t`}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.ID}</td>
                <td className="py-2 px-4 border">{item.Bib}</td>
                <td className="py-2 px-4 border">{item.TimingPoint}</td>
                <td className="py-2 px-4 border">{item.Result}</td>
                <td className="py-2 px-4 border">{item.Time}</td>
                <td className="py-2 px-4 border">{item.Invalid ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">{item.RoundCounter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TablePage;
