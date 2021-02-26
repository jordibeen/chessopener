import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Home() {
  return (
    <Wrapper>
        <h1>Home</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default Home;
