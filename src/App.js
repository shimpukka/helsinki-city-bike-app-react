import React, {useEffect, useState} from 'react';
import './App.css';
import LoadingWrapper from './components/Loading';
import JourneyList from './components/JourneyList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=> ({
  heading: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}));

const App = () => {
  const classes = useStyles();
  const Loading = LoadingWrapper(JourneyList);
  const [appState, setAppState] = useState({
    loading: true,
    journeys: null,
    stations: null
  });

  useEffect(() => {

    const apiUrl = 'http://127.0.0.1:8000/api/journey';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setAppState({ loading: false, journeys:data}));
   
    // TODO: combile promises
    // const stationApi = 'http://127.0.0.1:8000/api/station';
    // fetch(stationApi)
    //   .then(response => response.json())
    //   .then(data => setAppState({ loading:false, stations:data}));
  }, [setAppState]);

  return (
    <div className="App">
        <Typography variant="h3" component="h1" className={classes.heading}>
          Helsinki bike city app
        </Typography>
        <Loading isLoading={appState.loading} journeys={appState.journeys} stations={appState.stations}/>
      </div>
  )
};

export default App;