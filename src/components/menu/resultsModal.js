import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Modal from 'styled-react-modal'
import ReactTooltip from 'react-tooltip';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "../common/loader";

import { generateFenTooltip } from "helpers/fenTooltip";


function ResultsModal({ isResultsModalOpen, toggleModal, debouncedSearch, search, onInputChange }) {
  const [count, setCount] = useState(0);
  const [openings, setOpenings] = useState([]);
  const [offset, setOffset] = useState(false);
  const limit = 50;
  const [hasMore, setHasMore] = useState(false);
  const searchInputRef = createRef();

  useEffect(() => {
    if(debouncedSearch) {
      fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?search=${debouncedSearch}&limit=${limit}`)
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
  }, [debouncedSearch]);

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

  function onAfterOpen(){
    searchInputRef.current.focus();
  }

  function fetchMore(){
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?search=${debouncedSearch}&limit=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setOpenings(openings.concat(result.rows));
    }, (error) => {
    })
  }

  function getNameMatchString(search, name) {
      let retval = [];

      const searches = search.split(' ');
      searches.forEach((s, i) => {
        const substring = new RegExp(s, "gi");
        name = name.replace(substring, (match) => {return (`***${match}***`)});
      });

      name.split('***').forEach((match, i) => {
        if(i % 2){
          retval.push(
            <MatchingResultNameMatch>{match}</MatchingResultNameMatch>
          )
        } else {
          retval.push(
            <MatchingResultName>{match}</MatchingResultName>
          )
        }
      });

      return retval;
  }

  return (
    <StyledModal
        isOpen={isResultsModalOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        afterOpen={onAfterOpen}
    >
      <ModalContent>
        <InputWrapper>
          <Input
            ref={searchInputRef}
            type='text'
            value={search}
            onChange={onInputChange}
          />
          {
            count ?
            <SearchCount>{count} result{count !== 1 ? 's' : null }</SearchCount>
            : null
          }
        </InputWrapper>
        <ResultWrapper id='ResultWrapper'>
          <ResultHolder>
            <InfiniteScroll
              dataLength={openings.length}
              next={fetchMore}
              hasMore={hasMore}
              scrollableTarget={'ResultWrapper'}
              loader={<Loader/>}
            >
              {
                openings.map((opening, i) => {
                  return (
                    <ResultRow
                      key={i}
                      data-tip={opening.fen}
                      data-for={`search-tooltip`}
                    >
                      <OpeningLink to={`/opening/${opening.slug}`} onClick={toggleModal}>
                        <ResultRowName>[{opening.eco}] {getNameMatchString(debouncedSearch, opening.name)}</ResultRowName>
                        <ResultRowSequence>{opening.sequence}</ResultRowSequence>
                      </OpeningLink>
                    </ResultRow>
                  )
                })
              }
            </InfiniteScroll>
          </ResultHolder>
        </ResultWrapper>
        <ReactTooltip
           id={`search-tooltip`}
           place={'bottom'}
           getContent={generateFenTooltip}
         />
      </ModalContent>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  justify-content: left;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.componentBackground};
  width: 760px;
  padding: 0;
  height: 75%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.lightgrey};

  @media (${props => props.theme.breakpoints.mobile}) {
    width: 95%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.black};
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
`;

const Input = styled.input`
  width: 75%;
  padding-left: 16px;
  letter-spacing: 1.5px;
  background-color: black;
  height: 64px;
  border: none;
  border-radius: 12px 0 0 0;
  font-family: della-respira;
  outline: none;
  color: ${props => props.theme.colors.green};
  font-size: 1.6rem;
  font-weight: bold;
`;

const SearchCount = styled.div`
  color: ${props => props.theme.colors.white};
  margin: 0px 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.5px;
  text-align: center;
`;

const ResultWrapper = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
`;

const ResultHolder = styled.div`
  height: 100%;
`;

const ResultRow = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px;
`;

const OpeningLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const ResultRowName = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 8px;
  font-weight: bold;
`;

const MatchingResultName = styled.span`
`;

const MatchingResultNameMatch = styled.span`
  color: ${props => props.theme.colors.green};
`;

const ResultRowSequence = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.lightgrey};
`;


export default ResultsModal;
