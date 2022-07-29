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
    marginBottom: theme.spacing(10)
  },
  title: {
    flexGrow: 1,
    color: 'white',
    marginRight: theme.spacing(4),
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="body1" className={classes.title}>
              Helsinki city bike app
          </Typography>
          <Link to="/" className={classes.link}>
            <Typography variant="body1" className={classes.title}>
                Journeys
            </Typography>
          </Link>
          <Link to="/stations" className={classes.link}>
            <Typography variant="body1" className={classes.title}>
                Stations
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}