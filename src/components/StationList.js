import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        padding: '2rem'
    },
    link: {
        color: '#333',
    },
    gridContainer: {
        marginBottom: 40,
    },
    form: {
        marginBottom: '3rem',
    },
    title : {
        marginBottom: '1rem'
    }
}));

const StationList = () => {
    const [stations, setStations] = useState([]);
    const [page, setPage] = useState(1);
    const [term, setTerm] = useState('');
    const [filteredStations, setFilteredStations] = useState([]);
    const classes = useStyles();
    const itemPerPage = 32;
    const pageCount = Math.ceil(filteredStations.length/itemPerPage);
    
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000/api/station/`;
            const response = await fetch(url);
            const data = await response.json();
            setStations(data.results)
            setFilteredStations(data.results);
        };

        fetchData();
    }, []);

    const renderedStations = filteredStations.map((station, i) => {
        const {name_finnish, id} = station;

        if (((page - 1) * itemPerPage <= i) && i < page * itemPerPage) {
            return (
                <Grid key={id} item xs={4} className={classes.gridItem}>
                    <Link to={`/stations/${id}`} className={classes.link}>{name_finnish}</Link>
                </Grid>
            );
        }
    });

    const handleFormSubmit = e => {
        e.preventDefault();
        // const filteredStations = stations.filter(station => 
        //     station.name_finnish.toLowerCase().includes(term.toLowerCase())
        // );
        // setFilteredStations(filteredStations);
    };

    const inputProps = {
        color: 'primary',
        onChange: e => {
            setTerm(e.target.value);
            
            const filteredStations = stations.filter(station => 
                station.name_finnish.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredStations(filteredStations);
        }
    };
  

    const handlePaginationClick = (e, value) => {
        setPage(value);
    };

    return(
        <Container>
            <h1 className={classes.title}>Station List</h1>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <TextField id="search-input" type="input" inputProps={inputProps} label="Enter search term" />
            </form>

            <Grid container spacing={2} className={classes.gridContainer}>
                { renderedStations }
            </Grid>

            <Pagination onChange={handlePaginationClick} count={pageCount} className={classes.pagination} />

        </Container>
    );
};

export default StationList;