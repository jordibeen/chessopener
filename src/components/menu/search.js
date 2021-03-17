import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

import useDebounce from 'helpers/useDebounce';

const modalStyles = {
  content : {
    backgroundColor: '#272727',
    width: '512px',
    padding: 0
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

  useEffect(() => {
    if(debouncedSearch) {
      fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?search=${debouncedSearch}&limit=25`)
      .then(res => res.json())
      .then((result) => {
        setOpenings(result.rows);
        setCount(result.count);
      }, (error) => {
      })
    } else {
      setCount(0);
      setOpenings([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    document.addEventListener('keydown', escapeFunc, false);
    return () => document.removeEventListener('keydown', escapeFunc, false);
  });

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
        { count ?
            <ModalSearchCount>
              {count} openings in database:
            </ModalSearchCount> : null
        }
        <ModalSearchResults>
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
        </ModalSearchResults>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchInput = styled.input`
  background-color: ${props => props.theme.colors.componentBackground};
  border: none;
  border-radius: 4px;
  width: 100%;
  font-family: nasalization;
  outline: none;
  color: ${props => props.theme.colors.pink};
  font-style: italic;
`;

const ModalSearchInput = styled.input`
  background-color: black;
  height: 64px;
  border: none;
  border-radius: 2px;
  width: 100%;
  font-family: nasalization;
  outline: none;
  color: ${props => props.theme.colors.pink};
  font-style: italic;
  font-size: 1.6rem;
`;

const ModalSearchCount = styled.span`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.pink};
`;

const ModalSearchResults = styled.div`
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
  color: ${props => props.theme.colors.pink};
`;

const ModalSearchResultName = styled.p`
  font-size: 24px;
`;

const ModalSearchResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
`;

export default Search;
