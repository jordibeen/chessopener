import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ReactComponent as BlitzIcon } from 'assets/icons/blitz.svg';
import { ReactComponent as RapidIcon } from 'assets/icons/rapid.svg';
import { ReactComponent as ClassicalIcon } from 'assets/icons/classical.svg';
import Loader from '../common/loader';
import Error from '../common/error';

function OpeningInformation({ openingId }) {
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const limit = 5;
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${openingId}/games?limit=${limit}`)
      .then(res => res.json())
      .then((result) => {
        setCount(result.count);
        setGames(result.rows);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
      })

      return () => {
        setIsLoaded(false);
      }
  }, [openingId])

  useEffect(() => {
    if(games){
      const page = Math.ceil(games.length / limit);
      const nextOffset = page * limit;
      if(nextOffset < count) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setOffset(nextOffset);
    }
  }, [games, count])


  function fetchMore(){
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${openingId}/games?limit=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setGames(games.concat(result.rows));
    }, (error) => {
    })
  }

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

  if(!games || !games.length) {
    return <NoGames>No recent games</NoGames>
  }

  return (
      <Wrapper id='LichessGames'>
        <InfiniteScroll
             dataLength={games.length}
             next={fetchMore}
             hasMore={hasMore}
             scrollableTarget={'LichessGames'}
             loader={<Loader/>}
        >
        {
          games.map((game, i) => {
            return (
              <GameLink key={i} to={`/game/${game.id}`}>
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
                </LichessGame>
              </GameLink>
            )
          })
        }
      </InfiniteScroll>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 50%;

  @media (${props => props.theme.breakpoints.mobile}) {
     height: 240px;
   }

   /* Disable scroll bars entirely */
   -ms-overflow-style: none;
   scrollbar-width: none;
   ::-webkit-scrollbar {
     display: none;
   }
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
  flex: 0.7;
  font-size: 14px;

  @media (${props => props.theme.breakpoints.mobile}) {
    flex: 0.6;
  }
`;

const LichessWhitePlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  flex: 0.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const LichessBlackPlayer = styled.div`
  font-weight: ${props => props.winner ? 'bold' : 'none'};
  flex: 0.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const LichessResultWrapper = styled(TableItem)`
  flex: 0.1;

  @media (${props => props.theme.breakpoints.mobile}) {
    flex: 0.15;
  }
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
  margin: 0 auto;
`;

const LichessDate = styled(TableItem)`
  flex: 0.1;
  flex-direction: column;
  text-align: center;

  @media (${props => props.theme.breakpoints.mobile}) {
    flex: 0.15;
  }
`;

const Date = styled.div`
  font-size: 12px;
`;

const Year = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const NoGames = styled.div`
  margin: 16px 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;

export default OpeningInformation;
