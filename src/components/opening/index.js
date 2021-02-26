import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpeningBoard from './openingBoard';

function Opening({history, location, match}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [opening, setOpening] = useState(null);
    const id = match.params.id;

    useEffect(() => {
        fetch('http://localhost:7000/api/openings/' + id)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setOpening(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setOpening(error);
            }
          )
      }, [])

  if(!opening) return null;

  return (
    <Wrapper>
        <Info>
            <h1>Opening: {opening.name}</h1>
            <p>Sequence: {opening.sequence}</p>
        </Info>
        <OpeningBoard opening={opening} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
`;

export default Opening;
