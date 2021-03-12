import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import OpeningOfTheDayPreviewBoard from './openingOfTheDayPreviewBoard';

function OpeningOfTheDay({history, location, match}) {
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/1`)
      .then(res => res.json())
      .then((result) => {
        setOpening(result);
      }, (error) => {

      })
    }, [])

  if(!opening) return null;

  return (
    <Wrapper>
    <Title>Or try out the following</Title>
      <OpeningOfTheDayWrapper>
        <OpeningOfTheDayLink to={`openings/` + opening.id }>
          <OpeningOfTheDayTile>
            <OpeningOfTheDayName>{opening.name}</OpeningOfTheDayName>
            <OpeningOfTheDaySequence>{opening.sequence}</OpeningOfTheDaySequence>
            <OpeningOfTheDayPreviewBoardWrapper>
              <OpeningOfTheDayPreviewBoard opening={opening} />
            </OpeningOfTheDayPreviewBoardWrapper>
          </OpeningOfTheDayTile>
        </OpeningOfTheDayLink>
      </OpeningOfTheDayWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  @media (${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 70%;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.pink};
  padding: 0 16px;
`;

const OpeningOfTheDayWrapper = styled.div`
  padding: 16px;
`;

const OpeningOfTheDayTile = styled.div`
  border-radius: 4px;
  padding: 32px;
  background-color: ${props => props.theme.colors.componentBackground};

  :hover {
    background-color: ${props => props.theme.colors.componentBackgroundHighlight};
  }
`;

const OpeningOfTheDayLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.pink};
`;

const OpeningOfTheDayName = styled.h2`
  font-size: 1.5rem;
`;

const OpeningOfTheDaySequence = styled.span`
  font-size: 1rem;
  font-style: italic;
`;

const OpeningOfTheDayPreviewBoardWrapper = styled.div`
  max-width: 720px;
  margin: 32px auto;
`;

export default OpeningOfTheDay;
