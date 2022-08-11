import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import LoadingWrapper from './components/Loading';
import StationList from './components/StationList';
import StationSingle from './components/StationSingle';
import Home from './components/Home';
import EnhancedTable from './components/JourneyList';

const App = () => {
  // const Loading = LoadingWrapper(EnhancedTable);
  const [ appState, setAppState ] = useState({
    loading: true,
    journeys: null
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://127.0.0.1:8000/api/journey'; 
      const response = await fetch(url);
      const data = await response.json();
      setAppState( { loading: false, journeys: data.results })
    };
    fetchData();

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route index element={<Loading isLoading={appState.loading} journeys={appState.journeys} />} /> */}
          <Route index element={<EnhancedTable journeys={appState.journeys} />} />
          <Route path="stations" element={<StationList />} />
          <Route path="stations/:id" element={<StationSingle journeys={appState.journeys} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;