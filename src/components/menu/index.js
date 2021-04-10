import React from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import Search from './search'
import Button from "../common/button";

function Menu() {
  const history = useHistory();

  function onBackButtonClick(){
    history.goBack();
  }

  return (
    <Wrapper>
      <BackButton onClick={onBackButtonClick}>{`<<`}</BackButton>
      <TitleLink to='/'>
        <Title>chess opener</Title>
      </TitleLink>
      <Search />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
`;

const BackButton = styled(Button)`
  display: none;
  margin-right: 16px;

  @media (${props => props.theme.breakpoints.mobile}) {
     display: block;
   }
`;

const TitleLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
  text-align: right;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1.5px;
`;

export default Menu;
