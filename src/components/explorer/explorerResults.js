import React, { useState } from 'react';
import styled from 'styled-components';

import MatchingOpenings from './matchingOpenings';
import Welcome from './welcome';

function ExplorerResults({ sequence }) {
  const [count, setCount] = useState(0);

  return (
      <Wrapper>
        <Header>
          {
            sequence ?
              <Sequence>{sequence}</Sequence>
            : null
          }
          {
            sequence && count ?
              <SequenceCount>{count} results</SequenceCount>
            : null
          }
        </Header>
        {
          sequence ?
          <MatchingOpenings
            sequence={sequence}
            count={count}
            setCount={setCount}
          /> :
          <Welcome />
        }
      </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;
`;

const Header = styled.div`
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  padding: 16px;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 2px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
`;

const SequenceCount = styled.div`
  margin-top: 6px;
  color: ${props => props.theme.colors.white};
`;

export default ExplorerResults;
