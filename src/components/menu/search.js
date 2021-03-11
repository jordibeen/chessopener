import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openings, setOpenings] = useState([]);


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

  function onChange(event) {
    setSearch(event.target.value);
    const results = openings.filter(c => c.name.includes(search) || c.sequence.includes(search));
    setResults(results);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log('Focus on input');
  }

  function closeModal(){
    setIsOpen(false);
  }

  if(!isLoaded) return null;
  if(error) return null;
  if(!results) return null;

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Start typing"
        value={search}
        onChange={onChange}
        onFocus={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Search results"
      >
        <ModalSearchInput
          type="text"
          placeholder="Start typing"
          value={search}
          onChange={onChange}
        />
        <ModalSearchResults>
          {
            results.map((opening) => {
              return (
                <ModalSearchResult key={opening.id} href={`/openings/${opening.id}`}>
                  <ModalSearchResultName>{opening.name}</ModalSearchResultName>
                  <ModalSearchResultSequence>{opening.sequence}</ModalSearchResultSequence>
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
`;

const ModalSearchInput = styled.input`
`;

const ModalSearchResults = styled.div`
`;

const ModalSearchResult = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.color3};
`;

const ModalSearchResultName = styled.p`
  font-size: 24px;
`;

const ModalSearchResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
`;

export default Search;
