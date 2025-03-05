import React, { useEffect, useState } from 'react';


const GridPage = () => {
  const [raceResults, setRaceResults] = useState(() => {
    const savedResults = localStorage.getItem('raceResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });
  
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Grid View</h1>
      <p className="text-lg text-gray-600 mb-4">This will be the grid view. Customize as needed.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {raceResults.length > 0 ? (
          raceResults.map((item: any, index: number) => (
            <div key={index} className="p-4 border rounded shadow">
              <p><strong>Result {index + 1}:</strong></p>
              <pre className="text-left text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(item, null, 2)}
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
