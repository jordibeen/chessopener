import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import 'assets/chessboard/style.css'

import Home from 'components/home';
import Menu from 'components/menu';
import About from 'components/about';
import Opening from 'components/opening';
import Game from 'components/game';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/games/:id" component={Game} />
        <Route path="/openings/:id" component={Opening} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
