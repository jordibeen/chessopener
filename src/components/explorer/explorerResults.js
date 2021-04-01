import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "../common/loader";

import { generateFenTooltip } from "helpers/fenTooltip";

function ExplorerResults({ sequence }) {
  const [count, setCount] = useState(0);
  const [openings, setOpenings] = useState([]);
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
      }, (error) => {
      })
    } else {
      setCount(0);
      setOpenings([]);
    }
  }, [sequence]);

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

  function returnMatchingOpeningResultSequence(search, sequence) {
    return (
      <MatchingOpeningResultSequence>
        <Match>{search}</Match>
        <LeftOver>{sequence.replace(search, '')}</LeftOver>
      </MatchingOpeningResultSequence>
    )
  }

  return (
      <Wrapper>
        <Header>
          <Sequence>{
            sequence ?
              sequence :
              'play an opening to show results'
          }</Sequence>
          {
            count ?
            <SequenceCount>{count} results</SequenceCount>
            : null
          }
        </Header>
        <MatchingOpeningsWrapper id='MatchingOpeningsWrapper'>
          <InfiniteScroll
            dataLength={openings.length}
            next={fetchMore}
            hasMore={hasMore}
            scrollableTarget={'MatchingOpeningsWrapper'}
            loader={<Loader/>}
          >
            {
                openings.map((opening, i) => {
                  return (
                    <MatchingOpeningResult key={opening.id} data-tip={i} data-for={`explorer-tooltip-${i}`} >
                      <Link to={`/opening/${opening.slug}`}>
                        <MatchingOpeningResultName>[{opening.eco}] {opening.name}</MatchingOpeningResultName>
                        { returnMatchingOpeningResultSequence(sequence, opening.sequence) }
                      </Link>
                      <ReactTooltip
                         id={`explorer-tooltip-${i}`}
                         getContent={() => generateFenTooltip(opening.fen)}
                       />
                    </MatchingOpeningResult>
                  )
                })
            }
          </InfiniteScroll>
        </MatchingOpeningsWrapper>
      </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;
`;

const Header = styled.div`
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  padding: 16px;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 2px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
`;

const Match = styled.span`
  color: ${props => props.theme.colors.green};
`;

const LeftOver = styled.span`
`;

const SequenceCount = styled.div`
  margin-top: 6px;
  color: ${props => props.theme.colors.white};
`;

const MatchingOpeningsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const MatchingOpeningResult = styled.div`
  margin: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px 0;
  cursor: pointer;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const MatchingOpeningResultName = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 8px;
  font-weight: bold;
`;

const MatchingOpeningResultSequence = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.lightgrey};
  letter-spacing: 1px;
`;

export default ExplorerResults;
