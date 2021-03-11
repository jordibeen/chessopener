import React from 'react';
import styled from 'styled-components';
import Search from './search'

function Menu() {
  return (
    <Wrapper>
      <TitleLink href='/'>
        <Title>Chess openings</Title>
      </TitleLink>
      <Search />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const TitleLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.color3};
`;

const Title = styled.h1`
  font-size: 24px;
`;

export default Menu;
