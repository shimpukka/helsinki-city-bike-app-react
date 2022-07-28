import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import LoadingWrapper from './components/Loading';
import JourneyList from './components/JourneyList';
import { Outlet } from 'react-router-dom';
import StationList from './components/StationList';
import StationDetail from './components/StationDetail';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<p>Journey list</p>} />
          <Route path="stations" element={<StationList />} />
          <Route path="stations/:slug" element={<StationDetail />} />
        </Route>
  
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import React, {useEffect, useState} from 'react';
// import './App.css';
// import LoadingWrapper from './components/Loading';
// import JourneyList from './components/JourneyList';
// import { Outlet } from 'react-router-dom';


// const App = () => {
//   const Loading = LoadingWrapper(JourneyList);
//   const [appState, setAppState] = useState({
//     loading: true,
//     journeys: null,
//   });

//   useEffect(() => {
//     const apiUrl = 'http://127.0.0.1:8000/api/journey';
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => setAppState({ loading: false, journeys:data}));
   
//   }, []);

//   return (
//     <div className="App">
//         <Loading isLoading={appState.loading} journeys={appState.journeys} stations={appState.stations}/>
//         <Outlet />
//       </div>
//   )
// };

// export default App;