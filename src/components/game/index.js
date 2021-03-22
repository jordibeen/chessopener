import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GameBoard from './gameBoard';
import GameInformation from './gameInformation';

function Game({history, location, match}) {
  const [game, setGame] = useState(null);
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
      <GameBoard game={game} />
      <GameInformation game={game} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Game;
