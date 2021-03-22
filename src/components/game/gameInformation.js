import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import LichessIcon from 'assets/icons/lichess.png';

function GameInformation(game) {
  console.log(game);

  return (
    <Wrapper>
      <GameDetailsWrapper>
        <EcoWrapper>
          <Eco>{game.game.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{game.game.opening.name}</Name>
          <Sequence>{game.game.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </GameDetailsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  max-width: 32vw;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;
`;

const GameDetailsWrapper = styled.div`
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  border: none;
  width: 100%;
  display: flex;
  border-radius: 12px 12px 0 0;
`;

const EcoWrapper = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Eco = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2px;
`;

const NameSequenceWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 18px;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-style: italic;
  font-size: 14px;
  letter-spacing: 1px;
`;

export default GameInformation;
