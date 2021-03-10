import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [categoriesError, setCategoriesError] = useState(null);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openingsError, setOpeningsError] = useState(null);
  const [isOpeningsLoaded, setIsOpeningsLoaded] = useState(false);
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/categories')
    .then(res => res.json())
    .then((result) => {
      setIsCategoriesLoaded(true);
      setCategories(result);
    }, (error) => {
      setIsCategoriesLoaded(true);
      setCategoriesError(error);
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:7000/api/openings')
    .then(res => res.json())
    .then((result) => {
      setIsOpeningsLoaded(true);
      setOpenings(result);
    }, (error) => {
      setIsOpeningsLoaded(true);
      setOpeningsError(error);
    })
  }, [])

  let categoriesOpeningsMapping = {}
  categories.forEach((category, i) => {
    categoriesOpeningsMapping[category.id] = []
  });
  openings.forEach((opening, i) => {
    categoriesOpeningsMapping[opening.categoryId].push(opening);
  });

  if(!openings || !categories) return null;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        { categories.map((category) => (
            <div>
              <ListItem button key={category.id} component="a" href={`/categories/` + category.id }>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary={category.name} secondary={category.sequence} />
              </ListItem>
              <Divider />
              { categoriesOpeningsMapping[category.id].map((opening) => (
                <ListItem button key={opening.id} component="a" href={`/openings/` + opening.id }>
                  <ListItemText primary={opening.name} secondary={opening.sequence} />
                </ListItem>
              ))}
              <Divider />
            </div>
        ))
        }
      </Drawer>
    </div>
  );
}


export default Sidebar;
