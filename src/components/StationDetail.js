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
 
        setJourneysCount({ 
            starting:journeysStartingCount, 
            ending: journeysEndingCount, 
            averageDistanceStarting: averageDistanceStarting, 
            averageDistanceEnding: averageDistanceEnding 
        });

    }, [station]);

    return (
        <Container className={classes.root}>
            <h1 className={classes.title}>{station.name_english}</h1>
            <p> 
                <Typography className={classes.bold} component="span">Address:</Typography> {station.address_finnish}
            </p>
            <p> 
                <Typography className={classes.bold} component="span">Journeys made from this station :</Typography> {journeysCount.starting}
                {journeysCount.averageDistanceStarting ? ` (average distance: ${Math.round(journeysCount.averageDistanceStarting)} m)`: null}
            </p>
            <p> 
                <Typography className={classes.bold} component="span">Journeys ending at this station :</Typography> {journeysCount.ending}
                {journeysCount.averageDistanceEnding ? ` (average distance: ${Math.round(journeysCount.averageDistanceEnding)} m)`: null}
            </p>
        </Container>
    );
};

export default StationDetail;