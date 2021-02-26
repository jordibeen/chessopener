import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import AppBar from 'components/appBar';
import Home from 'components/home';
import About from 'components/about';
import Opening from 'components/opening';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500]
        }
      },
    }), [prefersDarkMode]);

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar/>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/openings/:id" component={Opening} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
