import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TablePage from './pages/TablePage';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-white font-bold text-lg">My App</Link>
            <div className="flex space-x-4">
              <Link to="/table" className="text-white">Table</Link>
              <Link to="/grid" className="text-white">Grid</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/grid" element={<GridPage />} />
          </Routes>
        </div>

        <footer className="bg-blue-600 text-center text-white p-4">
          © 2025 My App
        </footer>
      </div>
    </Router>
  );
};

export default App;