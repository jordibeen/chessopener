import React from 'react';
import styled from 'styled-components';

import Categories from './categories';
import Explorer from './explorer';
import OpeningOfTheDay from './openingOfTheDay';

function Home() {
  return (
    <Wrapper>
      { /* <Categories/> */ }
      { /* <OpeningOfTheDay/> */ }
      <Explorer/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 64px);
  padding: 32px 0;

  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Home;
