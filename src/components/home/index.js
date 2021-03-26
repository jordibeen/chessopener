import React from 'react';
import styled from 'styled-components';

import Explorer from './explorer';

function Home() {
  return (
    <Wrapper>
      <Explorer/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    height: calc(100% - 64px);
    width: 100%;
    padding: 32px 0;

    @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
    }
`;

export default Home;
