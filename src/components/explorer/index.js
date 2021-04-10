import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { SET_EXPLORER_SEQUENCE } from 'redux/reducers/explorer';
import ExplorerBoard from './explorerBoard';
import ExplorerResults from './explorerResults';

function Explorer() {
  const dispatch = useDispatch();
  const storedExplorerSequence = useSelector(state => state.explorer.sequence);
  const [sequence, setSequence] = useState(storedExplorerSequence);

  useEffect(() => {
    dispatch({
      type: SET_EXPLORER_SEQUENCE,
      payload: sequence
    });
  }, [sequence, dispatch])

  return (
    <Wrapper>
      <Helmet>
          <title>{sequence}</title>
          <meta name="description" content={`exploration sequence: ${sequence}`} />
      </Helmet>
      <ExplorerBoard
        sequence={sequence}
        setSequence={setSequence} />
      <ExplorerResults
        sequence={sequence}
       />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: calc(100% - 64px);
  width: 100%;
  padding: 16px 0;

  @media (${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export default Explorer;
