import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Button from "../common/button";

function Home() {
  return (
    <Wrapper>
      <ButtonHolder>
        <Button>
          <NavigationLink to='/explorer'>Go To Explorer</NavigationLink>
        </Button>
      </ButtonHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: calc(100% - 64px);
  width: 100%;
  padding: 32px 0;

  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const ButtonHolder = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.white};
`;

export default Home;
