import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function OpeningList({history, location, match}) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/openings')
    .then(res => res.json())
    .then((result) => {
      setIsLoaded(true);
      setOpenings(result);
    }, (error) => {
      setIsLoaded(true);
      setError(error);
    })
  }, [])

  if(!openings) return null;

  return (
    <div className={classes.wrapper}>
      <List component="nav">
        { openings.map((opening) => {
          return (
            <ListItemLink href={`openings/` + opening.id }>
              <ListItemText primary={opening.name} />
            </ListItemLink>
          )
        }) }
      </List>
    </div>
  );
}

export default OpeningList;
