import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import StationDetail from '../components/StationDetail';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      color: '#333',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem'
    },
    bold: {
        fontWeight: 'bold'
    }
}));
  

const StationSingle = ({ journeys }) => {
    const { id } = useParams();
    const [station, setStation] = useState({});
    const [detail, setDetail] = useState(null);
    const classes = useStyles();
    const apiKey = 'AIzaSyCA0HREqWozL-DXlEwg3vN8psIsDakIQxA';

    // fetch single station
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000/api/station/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setStation(data)
        };
        
        fetchData();
    }, []);

    // calculate station data (average distance from/to the station, popular stations from/to the station)
    useEffect(()=>{
        if (Object.keys(station).length === 0) return;  // ignore initial render

        // create arrays of journeys starting from/ending at this station
        const journeysStarting = journeys.filter(journey => journey.departure_station_id === station.station_id );
        const journeysEnding = journeys.filter(journey => journey.return_station_id === station.station_id );
        
        setDetail({ 
            startingJourneys: journeysStarting,
            endingJourneys: journeysEnding,
        });
    }, [station]);

    return (
        <Container className={classes.root}>
            <h1 className={classes.title}>{station.name_finnish}</h1>
            <p> 
                <Typography className={classes.bold} component="span">Address:</Typography> {station.address_finnish}
            </p>
            
            <StationDetail detail={detail} />
            
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

export default StationSingle;