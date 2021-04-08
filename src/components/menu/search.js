import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';

import ResultsModal from './resultsModal';

import useDebounce from 'helpers/useDebounce';

function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  function toggleModal(e) {
     setIsResultsModalOpen(!isResultsModalOpen);
   }

   function onInputChange(event) {
     setSearch(event.target.value);
   };

  useEffect(() => {
    document.addEventListener('keydown', keyDown, false);
    return () => document.removeEventListener('keydown', keyDown, false);
  });

  function keyDown(e) {
    if (e.keyCode === 27) {
      toggleModal();
    }
  }

  return (
    <Wrapper>
      <SearchInput
        type='text'
        placeholder='click to search'
        value={search}
        onChange={onInputChange}
        onFocus={toggleModal}
      />
      <ResultsModal
        isResultsModalOpen={isResultsModalOpen}
        toggleModal={toggleModal}
        debouncedSearch={debouncedSearch}
        search={search}
        setSearch={setSearch}
        onInputChange={onInputChange} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
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
  margin-left: 16px;
`;

export default Search;
