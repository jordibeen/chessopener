import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


function OpeningOfTheDay({history, location, match}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    fetch('http://localhost:7000/api/openings/' + 1)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setOpening(result);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }, [])

  if(!isLoaded) return null;
  if(error) return null;
  if(!opening) return null;

  return (
    <Wrapper>
      <OpeningOfTheDayLink to={`openings/` + opening.id }>
        <p>Opening of the day</p>
        <h1>Opening: {opening.name}</h1>
        <p>Category: {opening.categoryId}</p>
      </OpeningOfTheDayLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  @media (${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 70%;
  }
`;

const OpeningOfTheDayLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.color3};
`;

export default OpeningOfTheDay;
