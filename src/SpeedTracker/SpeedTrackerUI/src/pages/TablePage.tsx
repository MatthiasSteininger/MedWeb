import React, { useState } from 'react';

const TablePage = () => {
  const [raceResults, setRaceResults] = useState([]);
  const [count, setCount] = useState(0);

  const loadFileContent = () => {
    const filePath = 'C:\\_GitHUB\\@LVR-P\\MedWeb\\src\\SpeedTracker\\Data\\data1.json';

    // Use the `readFile` function exposed via the preload script
    // window.ipcRenderer.invoke('read-file', filePath);
    // window.stone.readFile(filePath);
    
    window.electronAddon.readFile(filePath).then((content: string) => {
      console.log(content); // Print file content to the console
      // const raceResultsJson = content.substring(0, 400);
      // i also had to trim in order for it to work - i guess the fileend newline

      const raceResultsLines = content.trim().split('\n').slice(0, 100); //he was not a fan of \r\n - even tho notepad told me that was the content
      const localRaceResults: any = raceResultsLines.map((line) => JSON.parse(line)); //like select in linq -> map every json entry (string) to object
      setRaceResults(localRaceResults)

    }).catch((error: Error) => {
      console.error('Error reading file:', error);
    })
  }

  return (
    <div className="p-6 px-16 flex flex-col">
      <div className='flex gap-10'>
        <h1 className="text-2xl font-bold mb-4" onClick={() => setCount(count + 1)}>Table Display {count}</h1>
        <button
          onClick={loadFileContent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Parse and Display Data
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
            {raceResults.map((item: any, index) => (
              <tr key={index} className="border-t">
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