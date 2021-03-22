import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import LichessIcon from 'assets/icons/lichess.png';

function OpeningInformation(opening) {
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/stats`)
      .then(res => res.json())
      .then((result) => {
        setStats(result);
      }, (error) => {
      })
  }, [opening])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/games`)
      .then(res => res.json())
      .then((result) => {
        setGames(result);
      }, (error) => {
      })
  }, [opening])

  function getResult(winner) {
    if(winner === 'draw'){
      return '½ - ½';
    } else if(winner === 'white'){
      return '1 - 0';
    } else if(winner === 'black') {
      return '0 - 1';
    }
  }

  if(!stats || !games) {
    return null;
  }

  return (
    <Wrapper>
      <OpeningDetailsWrapper>
        <EcoWrapper>
          <Eco>{opening.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{opening.opening.name}</Name>
          <Sequence>{opening.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </OpeningDetailsWrapper>
      <LichessStatsWrapper>
        <LichessStatsKeys>
          <p>Average rating</p>
          <p>Amount played</p>
          <p>White wins</p>
          <p>Draws</p>
          <p>Black wins</p>
        </LichessStatsKeys>
        <LichessStatsValues>
          <p>{stats.averageRating}</p>
          <p>{stats.amountPlayed}</p>
          <p>{stats.whiteWins}</p>
          <p>{stats.draws}</p>
          <p>{stats.blackWins}</p>
        </LichessStatsValues>
      </LichessStatsWrapper>
      <LichessGamesWrapper>
        {
          games.map((game) => {
            return (
              <GameLink to={`/games/${game.id}`}>
                <LichessGame>
                  <LichessType>
                    {
                      game.speed === 'blitz' ? <Blitz/> :
                      game.speed === 'rapid' ? <Rapid/> :
                      game.speed === 'classical' ? <Classical/> : null
                    }
                  </LichessType>
                  <LichessPlayers>
                    <LichessWhitePlayer winner={game.winner === 'white'}>{game.whiteName} ({game.whiteRating})</LichessWhitePlayer>
                    <LichessBlackPlayer winner={game.winner === 'black'}>{game.blackName} ({game.blackRating})</LichessBlackPlayer>
                  </LichessPlayers>
                  <LichessResultWrapper>
                    <LichessResult winner={game.winner}>{getResult(game.winner)}</LichessResult>
                  </LichessResultWrapper>
                  <LichessDate>
                    <p>{moment(game.playedAt).format('MMM Do YYYY')}</p>
                  </LichessDate>
                  <LichessLinkWrapper>
                    <LichessLink target='_blank' rel="noopener noreferrer" href={`https://lichess.org/${game.lichessId}`} >
                      <LichessIconWrapper imageUrl={LichessIcon} />
                    </LichessLink>
                  </LichessLinkWrapper>
                </LichessGame>
              </GameLink>
            )
          })
        }
      </LichessGamesWrapper>
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

const OpeningDetailsWrapper = styled.div`
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

const LichessStatsWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
`;

const LichessStatsKeys = styled.div`
  width: 50%;
  color: ${props => props.theme.colors.lightGrey};
  text-align: center;
`;

const LichessStatsValues = styled.div`
  width: 50%;
  color: ${props => props.theme.colors.white};
  text-align: center;
`;

const LichessGamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const LichessLinkWrapper = styled.div`
  width: 5%;
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

const GameLink = styled(NavLink)`
  text-decoration: none;
`;

const LichessGame = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  font-size: 18px;
  height: 64px;
  color: ${props => props.theme.colors.white};
`;

const LichessType = styled.div`
  width: 10%;
  text-align: center;
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

const LichessPlayers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

const LichessWhitePlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
`;

const LichessBlackPlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
`;

const LichessResultWrapper = styled.div`
  margin-left: 8px;
  width: 10%;
`;

const LichessResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 32px;
  border-radius: 2px;
  margin-left: 8px;
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
`;

const LichessDate = styled.div`
  width: 20%;
`;

export default OpeningInformation;
