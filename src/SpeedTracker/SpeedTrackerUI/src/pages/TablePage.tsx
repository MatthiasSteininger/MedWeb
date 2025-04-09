import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import OptionsBar from '../components/OptionsBar';
import { RaceResult } from '../utils/raceResultsSlice';
import { useAppSelector } from '../utils/store';

const TablePage = () =>
{
  const raceResultsSliceReducer = useAppSelector(state => state.raceResultsSliceReducer);
  const raceResults = raceResultsSliceReducer.raceResults ?? [];

  const [filters, setFilters] = useState<any>({
    Id: '',
    Bib: '',
    TimingPoint: '',
    Result: '',
    Invalid: '',
  });

  const calculateRoundCounters = (results: any[]) =>
  {
    const bibCounts: any = {};
    return results.map((item) =>
    {
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

  const exportAllToExcel = (raceResults: RaceResult[]) =>
  {
    const ws = XLSX.utils.json_to_sheet(raceResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'race_results.xlsx');
  };

  return (
    <div className="p-6 px-16 flex flex-col bg-gray-900 min-h-screen text-white">
      <OptionsBar title={"Feuerwehr Rennübersicht"} excelButton={
        <button
          onClick={() => exportAllToExcel(raceResults)}
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
          <FaFileExcel /> Alles Exportieren
        </button>
      }></OptionsBar>

      <div className="flex gap-4 mb-4">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={`Filter nach ${key}`}
            value={filters[key]}
            onChange={(e: { target: { name: any; value: any; }; }) =>
            {
              const { name, value } = e.target;
              setFilters({ ...filters, [name]: value });
            }}
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
    </div>
  );
};

export default TablePage;