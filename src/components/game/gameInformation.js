import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg';
import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import LichessIcon from 'assets/icons/lichess.png';

function GameInformation(game) {
  console.log(game);

  function getResult(winner) {
    if(winner === 'draw'){
      return '½ - ½';
    } else if(winner === 'white'){
      return '1 - 0';
    } else if(winner === 'black') {
      return '0 - 1';
    }
  }

  return (
    <Wrapper>
      <Header>
        <EcoWrapper>
          <Eco>{game.game.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{game.game.opening.name}</Name>
          <Sequence>{game.game.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </Header>
      <Information>
        <WhitePlayer>
          <WhiteAvatar />
          <WhiteName winner={game.game.winner === 'white'}>{game.game.whiteName} ({game.game.whiteRating})</WhiteName>
        </WhitePlayer>
        <Game>
          <TypeWrapper>
            {
              game.game.speed === 'blitz' ? <Blitz/> :
              game.game.speed === 'rapid' ? <Rapid/> :
              game.game.speed === 'classical' ? <Classical/> : null
            }
          </TypeWrapper>
          <Result winner={game.game.winner}>{getResult(game.game.winner)}</Result>
          <DateWrapper>
            <Date>{moment(game.playedAt).format('MMM Do')}</Date>
            <Year>{moment(game.playedAt).format('YYYY')}</Year>
          </DateWrapper>
        </Game>
        <BlackPlayer>
          <BlackAvatar />
          <BlackName winner={game.game.winner === 'black'}>{game.game.blackName} ({game.game.blackRating})</BlackName>
        </BlackPlayer>
        <LichessLinkWrapper>
          <LichessLink target='_blank' rel='noopener noreferrer' href={`https://lichess.org/${game.game.lichessId}`} >
            <LichessIconWrapper imageUrl={LichessIcon} />
          </LichessLink>
        </LichessLinkWrapper>
      </Information>
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
  display: flex;
  background-color: ${props => props.theme.colors.black};
  padding: 8px 2px;
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

const Information = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px;
  position: relative;
`;

const WhitePlayer = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const WhiteAvatar = styled(ProfileIcon)`
  width: 80px;
  height: 80px;
  fill: ${props => props.theme.colors.white};
  margin-bottom: 8px;
`;

const WhiteName = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
`;

const Game = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TypeWrapper = styled.div`
  margin-bottom: 8px;
`;

const Blitz = styled(BlitzIcon)`
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.colors.white};
`;

const Rapid = styled(RapidIcon)`
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.colors.white};
`;

const Classical = styled(ClassicalIcon)`
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.colors.white};
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 32px;
  border-radius: 2px;
  background: ${props =>
      props.winner === 'white' ? props.theme.colors.white :
      props.winner === 'black' ? props.theme.colors.black :
      props.winner === 'draw' ? props.theme.colors.lightgrey : 'none'
  };
  color: ${props =>
      props.winner === 'white' ? props.theme.colors.black :
      props.winner === 'black' ? props.theme.colors.white :
      props.winner === 'draw' ? props.theme.colors.lightGrey : props.theme.colors.white

  };
  margin-bottom: 8px;
`;

const DateWrapper = styled.div`
  text-align: center;
  margin-bottom:
`;

const Date = styled.div`
  font-size: 14px;
`;

const Year = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const BlackPlayer = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const BlackAvatar = styled(ProfileIcon)`
  width: 80px;
  height: 80px;
  fill: ${props => props.theme.colors.black};
  margin-bottom: 8px;
`;

const BlackName = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
`;

const LichessLinkWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  margin-right: 4px;
  margin-top: 4px;
`;

const LichessLink = styled.a`
  text-decoration: none;
`;

const LichessIconWrapper = styled.div`
  background-image: url(${p => p.imageUrl});
  background-size: cover;
  background-position: center center;
  width: 24px;
  height: 24px;
`;

export default GameInformation;
