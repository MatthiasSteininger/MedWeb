import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './pages/TablePage';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { reduxStore } from './utils/store';

const App = () => {
  return (
    <Provider store={reduxStore}>
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
    </Provider>
  );
};

export default App;