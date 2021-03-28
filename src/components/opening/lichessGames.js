import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import LichessIcon from 'assets/icons/lichess.png';
import Loader from "../common/loader";
import Error from "../common/error";

function OpeningInformation(opening) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState(null);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/games`)
      .then(res => res.json())
      .then((result) => {
        setGames(result);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
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

  if(!isLoaded) {
    return <Loader />
  }

  if(error) {
    return <Error />
  }

  return (
      <Wrapper>
        {
          games.map((game) => {
            return (
              <GameLink to={`/game/${game.id}`}>
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
                    <Date>{moment(game.playedAt).format('MMM Do')}</Date>
                    <Year>{moment(game.playedAt).format('YYYY')}</Year>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
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
  flex: 1;
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

const TableItem = styled.div`
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LichessType = styled(TableItem)`
  flex: 0.1;
  text-align: center;
`;

const LichessPlayers = styled(TableItem)`
  display: flex;
  justify-content: space-between;
  flex: 0.6;
`;

const LichessWhitePlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  flex: 0.5;
`;

const LichessBlackPlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  flex: 0.5;
`;

const LichessResultWrapper = styled(TableItem)`
  flex: 0.1;
`;

const LichessResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  font-size: 16px;
  font-weight: bold;
  width: 48px;
  height: 32px;
  background: ${props =>
      props.winner === 'white' ? props.theme.colors.white :
      props.winner === 'black' ? props.theme.colors.black :
      props.winner === 'draw' ? props.theme.colors.lightgrey : 'none'
  };
  color: ${props =>
      props.winner === 'white' ? props.theme.colors.black :
      props.winner === 'black' ? props.theme.colors.white :
      props.winner === 'draw' ? props.theme.colors.white : props.theme.colors.white
  };
`;

const LichessDate = styled(TableItem)`
  flex: 0.1;
  flex-direction: column;
  text-align: center;
`;

const Date = styled.div`
  font-size: 14px;
`;

const Year = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const LichessLinkWrapper = styled(TableItem)`
  flex: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default OpeningInformation;
