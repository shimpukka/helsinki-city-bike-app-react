import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        padding: '1rem'
    },
    link: {
        color: '#333',
    }
}));

const StationList = () => {
    const [stations, setStations] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000/api/station`;
            const response = await fetch(url);
            const data = await response.json();
            setStations(data)
        };
        
        fetchData();
    }, []);

    const renderedStations = stations.map(station => {
        const {name_finnish, id} = station;

        return (
            <Grid key={id} item xs={4} className={classes.gridItem}>
               <Link to={`/stations/${id}`} className={classes.link}>{name_finnish}</Link>
            </Grid>
        );
    });

    return(
        <Container>
            <h1>Station List</h1>
    
            <Grid container spacing={2}>
                { renderedStations }
            </Grid>
        </Container>
    );
};

export default StationList;