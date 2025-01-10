import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './pages/TablePage';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;