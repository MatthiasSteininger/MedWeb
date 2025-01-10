import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <nav className="bg-gray-800 w-full p-4 px-12 flex justify-between items-center h-auto">
      <div className="text-white text-2xl font-bold cursor-pointer hover:text-gray-300" onClick={() => navigate('/')}>
        SpeedTracker
      </div>
    </nav>
  );
}

export default Navbar;
