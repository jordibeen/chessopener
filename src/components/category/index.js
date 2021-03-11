import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CategoryBoard from './categoryBoard';

const useStyles = makeStyles((theme) => ({
  category: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequence: {
    fontStyle: 'italic',
  }
}));

function Category({history, location, match}) {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [category, setCategory] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch('http://localhost:7000/api/categories/' + id)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCategory(result);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }, [id])

  if(!isLoaded) return null;
  if(error) return null;
  if(!category) return null;

  return (
    <div className={classes.category}>
      <h1>Category: {category.name}</h1>
      <CategoryBoard category={category} />
      <span className={classes.sequence}>Sequence: {category.sequence}</span>
    </div>
  );
}

export default Category;
