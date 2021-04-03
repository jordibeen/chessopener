import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from "../common/loader";

import { generateFenTooltip } from "helpers/fenTooltip";
import useDebounce from 'helpers/useDebounce';

const modalStyles = {
  overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content : {
    backgroundColor: '#272727',
    width: '760px',
    padding: 0,
    overflow: 'none',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #717171',
    borderRadius: '12px'
  }
};

function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [openings, setOpenings] = useState([]);
  const limit = 50;
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(false);
  const menuInput = createRef();
  const modalInput = createRef();

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
    document.addEventListener('keydown', keyDown, false);
    return () => document.removeEventListener('keydown', keyDown, false);
  });

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

  function keyDown(e) {
    if (e.keyCode === 27) {
      setIsOpen(!modalIsOpen)
    }
  }

  function onChange(event) {
    setSearch(event.target.value);
    openModal();
  };

  function openModal() {
    setIsOpen(true);
    menuInput.current.blur();
  }

  function afterOpenModal() {
    modalInput.current.focus();
  }

  function closeModal(){
    setIsOpen(false);
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

  if(!openings) return null;

  return (
    <Wrapper>
      <SearchInput
        ref={menuInput}
        type="text"
        placeholder="press esc to search"
        value={search}
        onChange={onChange}
        onFocus={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={modalStyles}
        contentLabel="Search results"
      >
        <InputWrapper>
          <Input
            ref={modalInput}
            type="text"
            value={search}
            onChange={onChange}
          />
          {
            count ?
            <SearchCount>{count} results</SearchCount>
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
                      key={opening.id}
                      data-tip={opening.fen}
                      data-for={`search-tooltip`}
                    >
                      <Link to={`/opening/${opening.slug}`} onClick={closeModal}>
                        <ResultRowName>[{opening.eco}] {getNameMatchString(debouncedSearch, opening.name)}</ResultRowName>
                        <ResultRowSequence>{opening.sequence}</ResultRowSequence>
                      </Link>
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
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchInput = styled.input`
  padding-left: 16px;
  letter-spacing: 1.5px;
  background-color: ${props => props.theme.colors.componentBackground};
  border: none;
  border-radius: 4px;
  width: 100%;
  font-family: della-respira;
  outline: none;
  color: ${props => props.theme.colors.green};
  font-weight: bold;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.black};
  border-radius: 12px 12px 0 0;
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

const ResultWrapper = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
`;

const SearchCount = styled.div`
  margin-top: 6px;
  color: ${props => props.theme.colors.white};
  margin: 0px 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.5px;
`;

const ResultHolder = styled.div`
  height: 100%;
`;

const ResultRow = styled.div`
    margin: 0 16px;
    border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
    padding: 16px 0;
`;

const Link = styled(NavLink)`
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

export default Search;
