import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';

import Home from 'components/home';
import Menu from 'components/menu';
import About from 'components/about';
import Opening from 'components/opening';
import Category from 'components/category';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/openings/:id" component={Opening} />
        <Route path="/categories/:id" component={Category} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
