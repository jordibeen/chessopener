import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';

import theme from 'theme';

import TopBar from 'components/topBar';
import Home from 'components/home';
import About from 'components/about';
import Opening from 'components/opening';

const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.color1,
      contrastText: "#fff"
    },
    secondary: {
      main: '#fff',
      contrastText: theme.colors.color2,
    }
  },
  typography: {
    fontFamily: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'].join(',')
  },
});


function App() {
  return (
      <SCThemeProvider theme={theme}>
        <MUIThemeProvider theme={MUITheme}>
            <BrowserRouter>
                <TopBar />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route path="/opening/:id" component={Opening} />
            </BrowserRouter>
        </MUIThemeProvider>
      </SCThemeProvider>
  );
}

export default App;
