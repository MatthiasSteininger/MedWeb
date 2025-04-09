import { useState } from 'react'
import { FaFire, FaTrash } from 'react-icons/fa';
import { loadFileContent } from '../utils/helper';
import { raceResultsSliceAction } from '../utils/raceResultsSlice';
import { useAppDispatch, useAppSelector } from '../utils/store';

export default function OptionsBar({ title, excelButton }: any)
{
  const [showConfirmation, setShowConfirmation] = useState(false);

  const raceResultsSliceReducer = useAppSelector(state => state.raceResultsSliceReducer);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex gap-6 items-center mb-6">
        <h1 className="text-3xl font-extrabold text-red-500 flex items-center gap-2">
          <FaFire /> {title}
        </h1>
        <button onClick={() => loadFileContent().then((res) => dispatch(raceResultsSliceAction.setRaceResults(res)))}
          className={"text-white font-bold py-2 px-4 rounded shadow " + (raceResultsSliceReducer.isAutoReload ? "bg-gray-500" : "bg-gray-700 hover:bg-gray-600")}
          disabled={raceResultsSliceReducer.isAutoReload}>
          Daten laden
        </button>
        <label>
          <input
            type="checkbox"
            checked={raceResultsSliceReducer.isAutoReload}
            onChange={() => dispatch(raceResultsSliceAction.setIsAutoReload(!raceResultsSliceReducer.isAutoReload))}>
          </input>
          <a className='pl-2'>AutoReload</a>
        </label>
        <button onClick={() =>
        {
          setShowConfirmation(true);
        }} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2">
          <FaTrash /> Löschen
        </button>
        {excelButton}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Möchten Sie wirklich löschen?</h3>
            <div className="flex gap-4">
              <button
                onClick={() =>
                {
                  dispatch(raceResultsSliceAction.setRaceResults([]));
                  window.electronAddon.rmFile();
                  setShowConfirmation(false);
                }}
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
  )
}