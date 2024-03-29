import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import GameBoard from './gameBoard';
import GameInformation from './gameInformation';

function Game({history, location, match}) {
  const [game, setGame] = useState(null);
  const [chessHistory, setChessHistory] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [boardPosition, setBoardPosition] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/games/${id}`)
      .then(res => res.json())
      .then((result) => {
        setGame(result);
      }, (error) => {
      })
  }, [id])

  if(!game) return null;

  return (
    <Wrapper>
      <Helmet>
        <title>[{game.opening.eco}] {game.opening.name} ({game.whiteName} vs {game.blackName})</title>
        <meta name="description" content={`opening [${game.opening.eco}] ${game.opening.name} - game ${game.whiteName} vs ${game.blackName}`} />
      </Helmet>
      <GameBoard
        game={game}
        chessHistory={chessHistory}
        setChessHistory={setChessHistory}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        boardPosition={boardPosition}
      />
      <GameInformation
        game={game}
        chessHistory={chessHistory}
        currentPosition={currentPosition}
        setBoardPosition={setBoardPosition}
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

export default Game;
