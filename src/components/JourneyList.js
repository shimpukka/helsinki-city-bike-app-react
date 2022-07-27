import React from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const JourneyList = ({ journeys }) => {

    if (!journeys) return null;

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Departure station</TableCell>
                        <TableCell align="right">Return station</TableCell>
                        <TableCell align="right">Covered distance(m)</TableCell>
                        <TableCell align="right">Duration(m)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { 
                        journeys.map(item => {
                            const { id, departure_station_name, return_station_name, covered_distance, duration } = item;
                    
                            return (
                                <TableRow key={id}>
                                    <TableCell align="right">{departure_station_name}</TableCell>
                                    <TableCell align="right">{return_station_name}</TableCell>
                                    <TableCell align="right">{covered_distance}</TableCell>
                                    <TableCell align="right">{Math.floor(duration / 60, 2)}</TableCell>
                                </TableRow>
                            )
                        })
                    }                   
                </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default JourneyList;