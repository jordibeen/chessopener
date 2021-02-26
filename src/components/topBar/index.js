import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function TopBar() {
  return (
    <Wrapper>
        <NavigationItem exact to="/">Home</NavigationItem>
        <NavigationItem to="/about">About</NavigationItem>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 48px;
  background: white;
  box-shadow: 0px 2px 6px #00000029;
  padding: 12px 0;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.color3};

  @media (${props => props.theme.breakpoints.tablet}) {
    padding-left: 8px;
  }
`;

const NavigationItem = styled(NavLink)`
    color: ${props => props.theme.colors.color4};
    text-decoration: none;
    margin: 0 24px;

    &.active {
        color:red;
    }
`;

export default TopBar;
