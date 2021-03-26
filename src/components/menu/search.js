import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const menuSearchInputRef = createRef();
  const modalSearchInputRef = createRef();
  const limit = 50;
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(false);

  useEffect(() => {
    if(!debouncedSearch) {
      setCount(0);
      setOpenings([]);
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?search=${debouncedSearch}&limit=${limit}`)
      .then(res => res.json())
      .then((result) => {
        setOpenings(result.rows);
        setCount(result.count);
      }, (error) => {
    })
  }, [debouncedSearch]);

  useEffect(() => {
    document.addEventListener('keydown', escapeFunc, false);
    return () => document.removeEventListener('keydown', escapeFunc, false);
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

  function escapeFunc(e) {
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
    menuSearchInputRef.current.blur();
  }

  function afterOpenModal() {
    modalSearchInputRef.current.focus();
  }

  function closeModal(){
    setIsOpen(false);
  }

  function fetchData(){
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
        ref={menuSearchInputRef}
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
        <ModalSearchInputWrapper>
          <ModalSearchInput
            ref={modalSearchInputRef}
            type="text"
            value={search}
            onChange={onChange}
          />
          { count ?
              <ModalSearchCount>
                {count} results
              </ModalSearchCount> : null
          }
        </ModalSearchInputWrapper>
        <ModalSearchWrapper id='ModalSearchWrapper'>
          <ModalSearchResults>
            <InfiniteScroll
              dataLength={openings.length}
              next={fetchData}
              hasMore={hasMore}
              scrollableTarget={'ModalSearchWrapper'}
            >
              {
                openings.map((opening) => {
                  return (
                    <ModalSearchResult key={opening.id} >
                      <Link to={`/openings/${opening.slug}`} onClick={closeModal}>
                        <ModalSearchResultName>[{opening.eco}] {getNameMatchString(debouncedSearch, opening.name)}</ModalSearchResultName>
                        <ModalSearchResultSequence>{opening.sequence}</ModalSearchResultSequence>
                      </Link>
                    </ModalSearchResult>
                  )
                })
              }
            </InfiniteScroll>
          </ModalSearchResults>
        </ModalSearchWrapper>
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

const ModalSearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.black};
  border-radius: 12px 12px 0 0;
`;

const ModalSearchInput = styled.input`
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

const ModalSearchWrapper = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
`;

const ModalSearchCount = styled.div`
  color: ${props => props.theme.colors.green};
  margin: 0px 16px;
  display: flex;
  align-items: center;
`;

const ModalSearchResults = styled.div`
  height: 100%;
`;

const ModalSearchResult = styled.div`
    margin: 0 16px;
    border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
    padding: 16px 0;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const ModalSearchResultName = styled.p`
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

const ModalSearchResultSequence = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.lightgrey};
`;

export default Search;
