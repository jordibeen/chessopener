import React from 'react';
import styled from 'styled-components';

import LichessStats from './lichessStats';
import LichessGames from './lichessGames';

function OpeningInformation(opening) {
  return (
    <Wrapper>
      <Header>
        <EcoWrapper>
          <Eco>{opening.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{opening.opening.name}</Name>
          <Sequence>{opening.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </Header>
      <LichessStats opening={opening.opening} />
      <LichessGames opening={opening.opening} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 85vh;
  background-color: ${props => props.theme.colors.componentBackground};
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;

  @media (${props => props.theme.breakpoints.mobile}) {
  display: block;
  height: auto;
  width: 90%;
  max-width: none;
  margin-top: 32px;
}
`;

const Header = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.black};
  padding: 8px;
  border: none;
  border-radius: 12px 12px 0 0;
`;

const EcoWrapper = styled.div`
  flex: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Eco = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 28px;
`;

const NameSequenceWrapper = styled.div`
  flex: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
`;

const Name = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 18px;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
`;

export default OpeningInformation;
