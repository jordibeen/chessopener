import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

import Button from "../common/button";

const Chess = require("chess.js");

function GameBoard({game, chessHistory, setChessHistory, currentPosition, setCurrentPosition, boardPosition}) {
  const [chess] = useState(new Chess());
  const [initialPgnLoaded, setInitialPgnLoaded] = useState(false);
  const [fen, setFen] = useState(null);
  const [orientation, setOrientation] = useState(false);

  useEffect(() => {
    chess.load_pgn(game.pgn);
    const _ch = chess.history();
    setChessHistory(_ch);
    setCurrentPosition(_ch.length);
    setInitialPgnLoaded(true);
  }, [chess, game.pgn, setChessHistory, setCurrentPosition]);

  useEffect(() => {
    const openingSequence = game.opening.sequence;
    const openingSequencePosition = openingSequence.split(' ').length;
    if(initialPgnLoaded){
      goToPosition(openingSequencePosition);
    }
  }, [initialPgnLoaded, game.opening.sequence]);

  useEffect(() => {
    if(boardPosition){
      goToPosition(boardPosition);
    }
  }, [boardPosition])

  useEffect(() => {
    document.addEventListener('keydown', keydownFunc, false);
    return () => document.removeEventListener('keydown', keydownFunc, false);
  });

  function goToPosition(position) {
    const sequence = chessHistory.slice(0, position);
    const positionFen = generateFen(sequence);
    setCurrentPosition(position);
    setFen(positionFen);
  }

  function generateFen(sequence){
    const _c = new Chess();
    sequence.forEach((move, i) => {
      _c.move(move);
    });
    return _c.fen()
  }

  function previousPosition() {
    if (currentPosition === 0) {
      return;
    }
    goToPosition(currentPosition - 1);
  }

  function nextPosition() {
    if(currentPosition === chessHistory.length) {
      return;
    }
    goToPosition(currentPosition + 1);
  }

  function endPosition() {
    goToPosition(chessHistory.length);
  }

  function startingPosition() {
    goToPosition(0);
  }

  function keydownFunc(e){
    switch(e.keyCode){
      case 37:
        previousPosition();
        break;
      case 38:
        startingPosition();
        break;
      case 39:
        nextPosition();
        break;
      case 40:
        endPosition();
        break;
      default:
        break;
    }
  }

  function onOrientationClick(){
    setOrientation(!orientation);
  }

  if (!fen) return null;

  return (
    <Wrapper>
      <BoardHolder>
        <Chessground
          fen={fen}
          viewOnly={true}
          orientation={
            orientation ? 'black' : 'white'
          }
        />
      </BoardHolder>
      <ButtonHolder>
        <OrientationButton onClick={onOrientationClick}>swap orientation</OrientationButton>
        <PreviousButton onClick={previousPosition}>{`<`}</PreviousButton>
        <NextButton onClick={nextPosition}>{`>`}</NextButton>
      </ButtonHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  max-width: 32vw;

  @media (${props => props.theme.breakpoints.mobile}) {
    width: 96%;
    max-width: none
  }
`;

const BoardHolder = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;

  .cg-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .cg-custom-svgs {
    display: none;
  }
`;

const ButtonHolder = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const OrientationButton = styled(Button)`
  margin-right: 16px;
`;

const PreviousButton = styled(Button)`
  margin-right: 16px;
`;

const NextButton = styled(Button)`
`;

export default GameBoard;
