import React from 'react';
import styled from 'styled-components';

import Categories from './categories';
import OpeningOfTheDay from './openingOfTheDay';

function Home() {
  return (
    <Wrapper>
      <Categories/>
      <OpeningOfTheDay/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Home;
