import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDebounce from 'helpers/useDebounce';

const modalStyles = {
  content : {
    backgroundColor: '#272727',
    width: '760px',
    padding: 0,
    overflow: 'none',
    height: '90%',
    display: 'flex',
    flexDirection: 'column'
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
      console.log('escape');
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
    console.log('Open modal');
    modalSearchInputRef.current.focus();
  }

  function closeModal(){
    console.log('Close modal');
    setIsOpen(false);
  }

  function fetchData(){
    console.log('fetch');
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?search=${debouncedSearch}&limit=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setOpenings(openings.concat(result.rows));
    }, (error) => {
    })
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
        <ModalSearchInput
          ref={modalSearchInputRef}
          type="text"
          value={search}
          onChange={onChange}
        />
        <ModalSearchWrapper id='ModalSearchWrapper'>
          { count ?
              <ModalSearchCount>
                {count} openings in database:
              </ModalSearchCount> : null
          }
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
                      <Link to={`/openings/${opening.id}`} onClick={closeModal}>
                        <ModalSearchResultName>{opening.name}</ModalSearchResultName>
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
  font-family: menlo;
  outline: none;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
`;

const ModalSearchInput = styled.input`
  padding-left: 16px;
  letter-spacing: 1.5px;
  background-color: black;
  height: 64px;
  border: none;
  border-radius: 2px;
  width: 100%;
  font-family: menlo;
  outline: none;
  color: ${props => props.theme.colors.white};
  font-size: 1.6rem;
  font-weight: bold;
`;

const ModalSearchWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ModalSearchCount = styled.span`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.green};
`;

const ModalSearchResults = styled.div`
  height: 100%;
  padding: 8px;
`;

const ModalSearchResult = styled.div`
  border-bottom: 1px solid #eaeaea;
  background-color: ${props => props.theme.colors.componentBackground};

   :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const ModalSearchResultName = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
`;

const ModalSearchResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
  color: ${props => props.theme.colors.default};
`;

export default Search;
