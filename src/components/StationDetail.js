import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      color: '#333'
    },
    title: {
      fontSize: '2.5rem'
    },
    bold: {
        fontWeight: 'bold'
    }
}));
  

const StationDetail = ({ journeys }) => {
    const { id } = useParams();
    const [station, setStation] = useState({});
    const [journeysCount, setJourneysCount] = useState({});
    const classes = useStyles();
    const apiKey = 'AIzaSyCA0HREqWozL-DXlEwg3vN8psIsDakIQxA';

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000/api/station/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setStation(data)
        };
        
        fetchData();
    }, []);

    useEffect(()=>{
        if (Object.keys(station).length === 0) return;  // ignore initial render

        // Count journeys starting from/ending at this station and update state
        const journeysStarting = journeys.filter(journey => journey.departure_station_id === station.station_id );
        const journeysStartingCount = journeysStarting.length;
        const journeysEnding = journeys.filter(journey => journey.return_station_id === station.station_id );
        const journeysEndingCount = journeysEnding.length;
        const averageDistanceStarting = journeysStartingCount ? journeysStarting.reduce((acc, journey) => acc + journey.covered_distance, 0) / journeysStartingCount : 0;
        const averageDistanceEnding = journeysEndingCount ? journeysEnding.reduce((acc, journey) => acc + journey.covered_distance, 0) / journeysEndingCount : 0;

        // Generate ending station name/count pair object for journeys starting from this station
        const endingStations = {};

        journeysStarting.forEach(item => {
            endingStations[item.return_station_name] = endingStations[item.return_station_name] ? endingStations[item.return_station_name] + 1 : 1;
        });

        // Sort by count
        const endingStationsSorted = Object.entries(endingStations).sort((a,b) => a[1] < b[1]);
        
        setJourneysCount({ 
            starting:journeysStartingCount, 
            ending: journeysEndingCount, 
            averageDistanceStarting: averageDistanceStarting, 
            averageDistanceEnding: averageDistanceEnding,
            endingStations: endingStationsSorted,
        });
    }, [station]);

    
    const popularEndingStations = journeysCount.endingStations ? journeysCount.endingStations.map((item, i) => {
        if (i > 4) return;
        return <p key={i}>{item[0]} </p>
    }) : null;
    console.log(popularEndingStations);

    return (
        <Container className={classes.root}>
            <h1 className={classes.title}>{station.name_english}</h1>
            <p> 
                <Typography className={classes.bold} component="span">Address:</Typography> {station.address_finnish}
            </p>
            <p> 
                <Typography className={classes.bold} component="span">Journeys made from this station :</Typography> {journeysCount.starting}
                {journeysCount.averageDistanceStarting ? ` (average distance: ${Math.round(journeysCount.averageDistanceStarting) / 1000} km)`: null}
            </p>
            <p> 
                <Typography className={classes.bold} component="span">Journeys ending at this station :</Typography> {journeysCount.ending}
                {journeysCount.averageDistanceEnding ? ` (average distance: ${Math.round(journeysCount.averageDistanceEnding) / 1000} km)`: null}
            </p>
        
            <Typography className={classes.bold} component="span">Top 5 most popular return stations for journeys starting from the station: </Typography> 
            {popularEndingStations}
            
            <iframe 
                src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(station.address_finnish)}&key=${apiKey}`}
                style={{ border: "0" }}
                height="500"
                width="100%"
                loading="lazy"
                >
            </iframe>
        </Container>
    );
};

export default StationDetail;