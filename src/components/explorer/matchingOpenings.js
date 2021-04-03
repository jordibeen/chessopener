import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "../common/loader";
import Error from "../common/error";

import { generateFenTooltip } from "helpers/fenTooltip";

function MatchingOpenings({ sequence, count, setCount }) {
  const [error, setError] = useState(null);
  const [openings, setOpenings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const limit = 50;
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if(sequence) {
      fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}&limit=${limit}`)
      .then(res => res.json())
      .then((result) => {
        setCount(result.count);
        setOpenings(result.rows);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
      })
    } else {
      setCount(0);
      setOpenings([]);
    }

    return () => {
      setIsLoaded(false);
    }
  }, [sequence, setCount]);

  useEffect(() => {
    const page = Math.ceil(openings.length / limit);
    const nextOffset = page * limit;
    if(nextOffset < count) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setOffset(nextOffset);
  }, [openings, count])

  function fetchMore(){
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}&limit=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setOpenings(openings.concat(result.rows));
    }, (error) => {
    })
  }

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

  return (
    <Wrapper id='MatchingOpenings'>
      <InfiniteScroll
        dataLength={openings.length}
        next={fetchMore}
        hasMore={hasMore}
        scrollableTarget={'MatchingOpenings'}
        loader={<Loader/>}
      >
        {
            openings.map((opening, i) => {
              return (
                <OpeningRow
                  key={opening.id}
                  data-tip={opening.fen}
                  data-for={`explorer-tooltip`}
                >
                  <Link to={`/opening/${opening.slug}`}>
                    <OpeningName>[{opening.eco}] {opening.name}</OpeningName>
                    { returnResultSequence(sequence, opening.sequence) }
                  </Link>
                </OpeningRow>
              )
            })
        }
      </InfiniteScroll>
      <ReactTooltip
         id={`explorer-tooltip`}
         place={'bottom'}
         getContent={generateFenTooltip}
       />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const OpeningRow = styled.div`
  margin: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px 0;
  cursor: pointer;
`;

const Link = styled(NavLink)`
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

export default MatchingOpenings;
