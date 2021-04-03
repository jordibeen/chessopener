import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import 'assets/chessboard/style.css';
import 'assets/loader/react-spinner-loader.css';

import Explorer from 'components/explorer';
import Menu from 'components/menu';
import Opening from 'components/opening';
import Game from 'components/game';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Menu />
        <Route exact path="/" component={Explorer} />
        <Route path="/game/:id" component={Game} />
        <Route path="/opening/:slug" component={Opening} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
