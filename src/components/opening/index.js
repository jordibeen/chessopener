import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import OpeningBoard from './openingBoard';

const useStyles = makeStyles((theme) => ({
  opening: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequence: {
    fontStyle: 'italic',
  }
}));

function Opening({history, location, match}) {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opening, setOpening] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/` + id)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setOpening(result);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, [id])

  if(!isLoaded) return null;
  if(error) return null;
  if(!opening) return null;

  return (
    <div className={classes.opening}>
      <h1>Opening: {opening.name}</h1>
      <p>Category: {opening.categoryId}</p>
      <OpeningBoard opening={opening} />
      <span className={classes.sequence}>Sequence: {opening.sequence}</span>
    </div>
  );
}

export default Opening;
