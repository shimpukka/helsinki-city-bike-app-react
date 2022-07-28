import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const StationList = () => {
    const [stations, setStations] = useState([]);
    
    useEffect(() => {
        console.log('StationList useEffect')
        const url = 'http://127.0.0.1:8000/api/station';
        
        fetch(url)
        .then(response => response.json())
        .then(data => setStations(data));
    }, []);

    const renderedStations = stations.map(station => {
        const {name_english, id} = station;

        return (
            <div key={id}>
                <Link to={`/stations/${id}`}>{name_english}</Link>
            </div>
        );
    });

    return(
        <Container>
            <h2>Station List</h2>
            { renderedStations }
        </Container>
    );
};

export default StationList;