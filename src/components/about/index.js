import React from 'react';
import styled from 'styled-components';

function About() {
  return (
    <Wrapper>
      <Content>
        <h1>About</h1>
        <p>About</p>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 48px);
`;

const Content = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 0;
  padding: 24px;
`;

export default About;
