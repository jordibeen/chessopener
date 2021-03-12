import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

const modalStyles = {
  content : {
    backgroundColor: '#272727',
    width: '512px',
    padding: 0
  }
};

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openings, setOpenings] = useState([]);
  const searchInputRef = createRef();
  const inputRef = createRef();

  useEffect(() => {
    fetch('http://localhost:7000/api/openings')
    .then(res => res.json())
    .then((result) => {
      setIsLoaded(true);
      setOpenings(result);
    }, (error) => {
      setIsLoaded(true);
      setError(error);
    })
  }, []);

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
    const results = openings.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.sequence.toLowerCase().includes(search.toLowerCase()));
    setResults(results);
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log('Open modal');
    inputRef.current.focus();
    // searchInputRef.current.blur();
  }

  function closeModal(){
    console.log('Close modal');
    setIsOpen(false);
  }

  if(!isLoaded) return null;
  if(error) return null;
  if(!results) return null;

  return (
    <Wrapper>
      <SearchInput
        ref={searchInputRef}
        type="text"
        placeholder="press esc to search"
        value={search}
        onChange={onChange}
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
          ref={inputRef}
          type="text"
          value={search}
          onChange={onChange}
        />
        <ModalSearchResults>
          {
            results.map((opening) => {
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
