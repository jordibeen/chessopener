import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import OpeningList from './openingList';

const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <h1>Chess Openings</h1>
      <OpeningList/>
    </div>
  );
}

export default Home;
