import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const StationDetail = ({ journeys }) => {
    const { slug } = useParams();
    const [station, setStation] = useState({});

    useEffect(() => {
        const url = `http://127.0.0.1:8000/api/station/${slug}`;

        fetch(url)
        .then(response => response.json())
        .then(data => setStation(data));

        console.log('Station detail useEffect');

    }, []);
    
    // TODO: iterate journeys array and filter journey whose departure station is same as this station?

    return (
        <Container>
            <h1>{station.name_english}</h1>
            <p>{station.address_finnish}</p>
            <p>Total number of journeys starting from the station</p>
        </Container>
    );
};

export default StationDetail;