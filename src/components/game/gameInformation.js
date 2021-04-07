import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ReactComponent as ProfileIcon } from 'assets/icons/profile.svg';
import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import LichessIcon from 'assets/icons/lichess.png';

function GameInformation({game, chessHistory, currentPosition, setBoardPosition}) {
  function getResult(winner) {
    if(winner === 'draw'){
      return '½ - ½';
    } else if(winner === 'white'){
      return '1 - 0';
    } else if(winner === 'black') {
      return '0 - 1';
    }
  }

  function onMoveClick(position) {
    setBoardPosition(position);
  }

  if(!chessHistory) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <EcoWrapper>
          <Eco>{game.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{game.opening.name}</Name>
          <Sequence>{game.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </Header>
      <Information>
        <WhitePlayer>
          <PlayerLink href={`https://lichess.org/@/${game.whiteName}`} target='_blank' rel='noopener noreferrer' alt='View profile on lichess.com'>
            <WhiteAvatar />
            <WhiteName winner={game.winner === 'white'}>{game.whiteName}</WhiteName>
            <WhiteRating winner={game.winner === 'white'}>({game.whiteRating})</WhiteRating>
          </PlayerLink>
        </WhitePlayer>
        <Game>
          <TypeWrapper>
            {
              game.speed === 'blitz' ? <Blitz/> :
              game.speed === 'rapid' ? <Rapid/> :
              game.speed === 'classical' ? <Classical/> : null
            }
          </TypeWrapper>
          <Result winner={game.winner}>{getResult(game.winner)}</Result>
          <DateWrapper>
            <Date>{moment(game.playedAt).format('MMM Do')}</Date>
            <Year>{moment(game.playedAt).format('YYYY')}</Year>
          </DateWrapper>
        </Game>
        <BlackPlayer>
          <PlayerLink href={`https://lichess.org/@/${game.blackName}`} target='_blank' rel='noopener noreferrer' alt='View profile on lichess.com'>
            <BlackAvatar />
            <BlackName winner={game.winner === 'black'}>{game.blackName}</BlackName>
            <WhiteRating winner={game.winner === 'black'}>({game.blackRating})</WhiteRating>
          </PlayerLink>
        </BlackPlayer>
        <LichessLinkWrapper>
          <LichessLink href={`https://lichess.org/${game.lichessId}`} target='_blank' rel='noopener noreferrer' alt='View game on lichess.com'>
            <LichessIconWrapper imageUrl={LichessIcon} />
          </LichessLink>
        </LichessLinkWrapper>
      </Information>
      <Moves>
        {
          chessHistory.map((hist, i) => {
            if(!(i % 2)){
              return (
                <MoveRow key={i}>
                  <MoveNumber>{i / 2 + 1}</MoveNumber>
                  <WhiteMove onClick={() => onMoveClick(i + 1)} active={i === (currentPosition - 1)}>{chessHistory[i]}</WhiteMove>
                  <BlackMove onClick={() => onMoveClick(i + 2)} active={(i + 1) === (currentPosition - 1)}>{chessHistory[i + 1]}</BlackMove>
                </MoveRow>
              )
            } else {
              return null;
            }
          })
        }
      </Moves>
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

const Information = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px;
  position: relative;
`;

const PlayerLink = styled.a`
  text-decoration: none;
  text-align: center;
  color: ${props => props.theme.colors.white};
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
  text-align: center;
  font-weight: ${props => props.winner ? 'bold' : 'none'};
`;

const WhiteRating = styled.div`
  text-align: center;
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
  text-align: center;
  font-weight: ${props => props.winner ? 'bold' : 'none'};
`;

const BlackRating = styled.div`
  text-align: center;
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

const Moves = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  overflow: scroll;
`;

const MoveRow = styled.div`
  display: flex;
  font-size: 20px;
  letter-spacing: 1.5px;
  line-height: 1.5;
`;

const MoveNumber = styled.div`
  flex: 0.1;
  border-right: 1px solid ${props => props.theme.colors.lightgrey};
  text-align: right;
  padding-right: 8px;
`;

const Move = styled.div`
  cursor: pointer;
  flex: 0.48;
  padding-left: 8px;
  ${p => p.active ?
      `
        font-weight: bold;
        background-color: ${p.theme.colors.componentBackgroundHighlight};
      `
      : null
  }

  :hover {
    background-color: ${props => props.theme.colors.componentBackgroundHighlight};
  }
`;

const WhiteMove = styled(Move)`
  border-right: 1px solid ${props => props.theme.colors.lightgrey};
`;

const BlackMove = styled(Move)`
`;



export default GameInformation;
