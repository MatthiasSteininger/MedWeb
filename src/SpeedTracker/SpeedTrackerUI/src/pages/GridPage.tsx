import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaTrash, FaFire } from 'react-icons/fa';

const GridPage = () => {
  const [raceResults, setRaceResults] = useState(() => {
    const savedResults = localStorage.getItem('raceResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  // Funktion zum Formatieren der Zeit in Minuten und Sekunden
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const calculateStatistics = (results: any[]) => {
    const bibStats: Record<string, { times: number[]; totalRounds: number }> = {};

    results.forEach((item) => {
      if (!bibStats[item.Bib]) {
        bibStats[item.Bib] = { times: [], totalRounds: 0 };
      }

      // Die Zeit für jede Runde wird separat als Zeit pro Runde gespeichert
      const timeInSeconds = item.Time; // Zeit der aktuellen Runde in Sekunden
      if (!isNaN(timeInSeconds)) {
        bibStats[item.Bib].times.push(timeInSeconds); // Zeit pro Runde hinzufügen
        bibStats[item.Bib].totalRounds += 1; // Erhöhe die Anzahl der Runden
      }
    });

    // Umwandlung in eine übersichtliche Statistik
    return Object.keys(bibStats).map((bib) => {
      const times = bibStats[bib].times;
      const totalRounds = bibStats[bib].totalRounds;

      // Durchschnittliche Zeit berechnen
      const averageTime =  times.length > 0 ? (Math.max(...times)) / totalRounds : 0;

      return {
        Bib: bib,
        Times: times.map((time) => formatTime(time)).join(', '), // Formatierte Rundenzeiten
        Fastest: times.length > 0 ? formatTime(Math.min(...times)) : 'N/A',
        Slowest: times.length > 0 ? formatTime(Math.max(...times)) : 'N/A',
        Average: times.length > 0 ? formatTime(averageTime) : 'N/A', // Durchschnittliche Zeit
        TotalRounds: totalRounds,
      };
    });
  };

  const bibStatistics = calculateStatistics(raceResults);

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
  };

  const exportToExcel = () => {
    const formattedResults = bibStatistics.map(stat => ({
      'Bib': stat.Bib,
      'Times': stat.Times, // Formatierte Zeiten
      'Fastest': stat.Fastest,
      'Slowest': stat.Slowest,
      'Average': stat.Average, // Durchschnittliche Zeit
      'Total Rounds': stat.TotalRounds
    }));

    const ws = XLSX.utils.json_to_sheet(formattedResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'race_results.xlsx');
  };

  return (
    <div className="p-6 px-16 flex flex-col bg-gray-900 min-h-screen text-white">
      <div className="flex gap-6 items-center mb-6">
        <h1 className="text-3xl font-extrabold text-red-500 flex items-center gap-2">
          <FaFire /> Läufer Übersicht
        </h1>
        <button onClick={loadFileContent} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow">
          Daten laden
        </button>
        <button onClick={clearTable} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
          <FaTrash /> Löschen
        </button>
        <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
          <FaFileExcel /> Exportieren
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-300 mb-4">Läufer Statistik</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bibStatistics.length > 0 ? (
          bibStatistics.map((stat, index) => (
            <div key={index} className="p-4 border rounded shadow bg-gray-800">
              <p><strong>Bib {stat.Bib}:</strong></p>
              <p>Zeiten: {stat.Times}</p>
              <p>Schnellste Zeit: {stat.Fastest}</p>
              <p>Langsamste Zeit: {stat.Slowest}</p>
              <p>Durchschnittliche Zeit: {stat.Average}</p> {/* Anzeige der durchschnittlichen Zeit */}
              <p>Rundenanzahl: {stat.TotalRounds}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Keine Ergebnisse verfügbar</p>
        )}
      </div>
    </div>
  );
};

export default GridPage;
