import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import OptionsBar from '../components/OptionsBar';
import { useAppSelector } from '../utils/store';

const GridPage = () =>
{
  const raceResultsSliceReducer = useAppSelector(state => state.raceResultsSliceReducer);
  const raceResults = raceResultsSliceReducer.raceResults ?? [];

  // Funktion zum Formatieren der Zeit in Minuten und Sekunden
  const formatTime = (seconds: number) =>
  {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };
  // Funktion zum Umrechnen von kumulierten Zeiten in Rundenzeiten
  const convertCumulativeToLapTimes = (cumulativeTimes: string | any[]) =>
  {
    const lapTimes = [];
    for (let i = 0; i < cumulativeTimes.length; i++)
    {
      if (i === 0)
      {
        lapTimes.push(cumulativeTimes[i]); // Erste Zeit bleibt gleich
      } else
      {
        lapTimes.push(cumulativeTimes[i] - cumulativeTimes[i - 1]); // Differenz berechnen
      }
    }
    return lapTimes;
  };
  const calculateStatistics = (results: any[]) =>
  {
    const bibStats: any = {};

    results.forEach((item) =>
    {
      if (!bibStats[item.Bib])
      {
        bibStats[item.Bib] = { times: [], totalRounds: 0 };
      }

      // Die Zeiten sind hier kumuliert
      const cumulativeTimeInSeconds = item.Time;

      if (!isNaN(cumulativeTimeInSeconds))
      {
        bibStats[item.Bib].times.push(cumulativeTimeInSeconds);
      }
    });

    // Kumulierte Zeiten in Rundenzeiten umwandeln
    Object.keys(bibStats).forEach((bib) =>
    {
      const cumulativeTimes = bibStats[bib].times;
      bibStats[bib].times = convertCumulativeToLapTimes(cumulativeTimes); // Umwandeln
      bibStats[bib].totalRounds = cumulativeTimes.length;
    });

    return Object.keys(bibStats).map((bib) =>
    {
      const times = bibStats[bib].times;
      const totalRounds = bibStats[bib].totalRounds;

      const averageTime = times.length > 0 ? times.reduce((a: any, b: any) => a + b, 0) / times.length : 0;

      return {
        Bib: bib,
        Times: times.map((time: any) => formatTime(time)).join(', '),
        Fastest: times.length > 0 ? formatTime(Math.min(...times)) : 'N/A',
        Slowest: times.length > 0 ? formatTime(Math.max(...times)) : 'N/A',
        Average: times.length > 0 ? formatTime(averageTime) : 'N/A',
        TotalRounds: totalRounds,
      };
    });
  };

  const bibStatistics = calculateStatistics(raceResults);

  const exportStatisticsToExcel = () =>
  {
    const formattedResults = bibStatistics.map(stat => ({
      'Bib': stat.Bib,
      'Times': stat.Times,
      'Fastest': stat.Fastest,
      'Slowest': stat.Slowest,
      'Average': stat.Average,
      'Total Rounds': stat.TotalRounds
    }));

    const ws = XLSX.utils.json_to_sheet(formattedResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'race_results.xlsx');
  };

  return (
    <div className="p-6 px-16 flex flex-col bg-gray-900 min-h-screen text-white">
      <OptionsBar title={"Läufer Übersicht"}
        excelButton={
          <button onClick={exportStatisticsToExcel} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
            <FaFileExcel /> Statistik Exportieren
          </button>
        }
      ></OptionsBar>

      <h2 className="text-xl font-bold text-gray-300 mb-4">Läufer Statistik</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bibStatistics.length > 0 ? (
          bibStatistics.map((stat, index) => (
            <div key={index} className="p-4 border rounded shadow bg-gray-800">
              <p><strong>Bib {stat.Bib}:</strong></p>
              <p>Zeiten: {stat.Times}</p>
              <p>Schnellste Zeit: {stat.Fastest}</p>
              <p>Langsamste Zeit: {stat.Slowest}</p>
              <p>Durchschnittliche Zeit: {stat.Average}</p>
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