import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#007ac9',
    marginBottom: theme.spacing(5)
  },
  title: {
    flexGrow: 1,
    color: 'white',
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="body1" className={classes.title}>
                Journeys
            </Typography>
          </Link>
          <Link to="/stations" style={{ textDecoration: 'none' }}>
            <Typography variant="body1" className={classes.title}>
                Stations
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}