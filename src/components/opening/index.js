import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpeningBoard from './openingBoard';
import OpeningInformation from './openingInformation';

function Opening({history, location, match}) {
  const [opening, setOpening] = useState(null);
  const slug = match.params.slug;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/s/${slug}`)
      .then(res => res.json())
      .then((result) => {
        setOpening(result);
      }, (error) => {
      })
  }, [slug])

  if(!opening) return null;

  return (
    <Wrapper>
      <OpeningBoard opening={opening} />
      <OpeningInformation opening={opening} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Opening;
