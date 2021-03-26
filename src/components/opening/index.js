import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpeningBoard from './openingBoard';
import OpeningInformation from './openingInformation';
import Loader from "../common/loader";
import Error from "../common/error";

function Opening({history, location, match}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opening, setOpening] = useState(null);
  const slug = match.params.slug;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/s/${slug}`)
      .then(res => res.json())
      .then((result) => {
        setOpening(result);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
      })
  }, [slug])

  if(!isLoaded) {
    return <Loader />
  }

  if(error) {
    return <Error />
  }

  return (
    <Wrapper>
      <OpeningBoard opening={opening} />
      <OpeningInformation opening={opening} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: calc(100% - 64px);
  width: 100%;
  padding: 32px 0;

  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Opening;
