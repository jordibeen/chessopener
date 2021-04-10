import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';

import Loader from '../common/loader';
import Error from '../common/error';

import { generateFenTooltip } from "helpers/fenTooltip";

function Continuations({ sequence }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openings, setOpenings] = useState(null);


  useEffect(() => {
    if(sequence) {
      fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}`)
      .then(res => res.json())
      .then((result) => {
        setOpenings(result.rows);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
      })
    } else {
      setOpenings([]);
    }
  }, [sequence]);

  function returnResultSequence(search, sequence) {
    return (
      <ResultSequence>
        <Match>{search}</Match>{sequence.replace(search, '')}
      </ResultSequence>
    )
  }

  if(!isLoaded) {
    return <Loader />
  }

  if(error) {
    return <Error />
  }

  if(!openings || !openings.length || (openings.length === 1 && openings[0].sequence === sequence)) {
    return null;
  }

  return (
      <Wrapper>
        <ContinuationTitle>continuations in this line</ContinuationTitle>
        <RowWrapper>
          {
            openings.map((opening, i) => {
              if(opening.sequence === sequence){
                return null;
              }
              return (
                <OpeningRow
                  key={opening.id}
                  data-tip={opening.fen}
                  data-for={`continuation-tooltip`}
                >
                  <OpeningLink to={`/opening/${opening.slug}`}>
                    <OpeningName>[{opening.eco}] {opening.name}</OpeningName>
                    { returnResultSequence(sequence, opening.sequence) }
                  </OpeningLink>
                </OpeningRow>
              )
            })
        }
        </RowWrapper>
        <ReactTooltip
          id={`continuation-tooltip`}
          place={'bottom'}
          getContent={generateFenTooltip}
        />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;

    @media (${props => props.theme.breakpoints.mobile}) {
     height: 400px;
   }
`;

const ContinuationTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 8px 16px;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.black};
`;

const RowWrapper = styled.div`
  overflow: scroll;

  /* Disable scroll bars entirely */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OpeningRow = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px;
  cursor: pointer;
`;

const OpeningLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const OpeningName = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 8px;
  font-weight: bold;
`;

const ResultSequence = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.lightgrey};
  letter-spacing: 1px;
`;

const Match = styled.span`
  color: ${props => props.theme.colors.green};
`;

export default Continuations;
