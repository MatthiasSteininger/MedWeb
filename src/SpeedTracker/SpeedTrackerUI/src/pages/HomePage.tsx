import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Table, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 to-red-500 flex flex-col items-center justify-center h-screen p-6 text-white">
      <div className="text-center space-y-6">
        <Flame className="w-16 h-16 text-yellow-400 animate-pulse" />
        <h1 className="text-6xl font-extrabold drop-shadow-lg">SpeedTracker</h1>
        <p className="text-xl font-medium">Die Laufzeitmessung für die Berufsfeuerwehr Linz.</p>
        
        <div className="flex space-x-6 mt-4">
          <Link to="/table">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg hover:bg-gray-800 transition duration-300">
              <Table className="w-5 h-5" /> Ergebnis-Tabelle
            </button>
          </Link>
          
          <Link to="/grid">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg hover:bg-gray-800 transition duration-300">
              <Users className="w-5 h-5" /> Läuferübersicht
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
