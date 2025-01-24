import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center space-y-4 p-4 flex-grow">
      <div className="text-left space-y-4">
        <h1 className="text-5xl font-bold text-white">SpeedTracker</h1>
        <p className="text-xl text-white">
          SpeedTracker für die BerufsfeuerwehrLinz.
        </p>
        <div className="space-x-4">
          <Link to="/table">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-blue-200 transition duration-300">
              View Table
            </button>
          </Link>
          <Link to="/grid">
            <button className="bg-white text-teal-500 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-blue-200 transition duration-300">
              View Grid
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
