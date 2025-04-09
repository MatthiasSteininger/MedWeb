import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './pages/TablePage';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { reduxStore, useAppDispatch, useAppSelector } from './utils/store';
import { useEffect } from 'react';
import { loadFileContent } from './utils/helper';
import { raceResultsSliceAction } from './utils/raceResultsSlice';

//npx electron-packager . SpeedTrackerUI_v1.0.0  --platform=win32 --arch=x64 --icon=assets/icon.ico --overwrite

const BackgroundJobs = ({ children }: any) =>
{
  const raceResultsSliceReducer = useAppSelector(state => state.raceResultsSliceReducer);
  const dispatch = useAppDispatch();

  useEffect(() =>
  {
    if (raceResultsSliceReducer.isAutoReload)
    {
      // loadFileContent().then((res) => dispatch(raceResultsSliceAction.setRaceResults(res)))
      // to not have the dealy after first activation
      const interval = setInterval(() =>
      {
        loadFileContent().then((res) => dispatch(raceResultsSliceAction.setRaceResults(res)))
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [raceResultsSliceReducer.isAutoReload]); //does run the first render as well but at that time it is false anyways

  return (<>
    {children}
  </>)
}

const App = () =>
{
  return (
    <Provider store={reduxStore}>
      <BackgroundJobs>
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
      </BackgroundJobs>
    </Provider>
  );
};

export default App;