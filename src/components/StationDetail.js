import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: 'bold'
    }
}));

const StationDetail = ({ detail }) => {
    const classes = useStyles();
    if (detail === null) return;
    
    const { startingJourneys, endingJourneys } = detail;
    
    const averageDistance = arr => {
        const avDistance = arr.reduce((acc, journey) => acc + journey.covered_distance, 0) / arr.length;
        return(
            <span>
                {
                    arr.length ? 
                    `(average distance: ${Math.round(avDistance) / 1000} km)`
                    : null
                }
            </span>
        );
    };

    const popularStations = (arr, key) => {
        console.log(arr)
        const stations = {};
        arr.forEach(item => {
            const stationName = item[key];
            stations[stationName] = stations[stationName] ? stations[stationName] + 1 : 1;
        });

        // Sort by count and slice top 5 popular stations
        const stationsSorted = Object.entries(stations).sort((a,b) => b[1] - a[1]);
        const popularStations = stationsSorted.slice(0,5).map(item => item[0]);

        return (
            <span>
                {
                    popularStations.map((item, i) => {
                        return (
                            <span key={i}>
                                { i === popularStations.length - 1 ? item : `${item}, `}
                            </span>
                        )
                    })
                }
            </span>
        );
    };

    return (
        <Box sx={{ mb: 5 }}>
            <Box sx={{ mb: 1 }}>
                <Typography component="span" className={classes.bold}>Journeys made from this station :</Typography> {startingJourneys.length} &nbsp;
                { averageDistance(startingJourneys) }
            </Box>
            <Box sx={{ mb: 3 }}>
                <Typography component="span">Top 5 most popular return stations: </Typography>
                { popularStations(startingJourneys, 'return_station_name') }
            </Box>

            <Box sx={{ mb: 1 }}>
                <Typography component="span" className={classes.bold}>Journeys ending at this station :</Typography> {endingJourneys.length} &nbsp;
                { averageDistance(endingJourneys) }
            </Box>
            <Box sx={{ mb: 3 }}>
                <Typography component="span">Top 5 most popular departure stations: </Typography>
                { popularStations(endingJourneys, 'departure_station_name') }
            </Box>
            
        </Box>
    )
};

export default StationDetail;