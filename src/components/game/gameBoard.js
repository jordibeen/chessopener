import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

const Chess = require("chess.js");

function GameBoard(game) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);
  const [history, setHistory] = useState(null);
  const [orientation, setOrientation] = useState(false);
  const [currentHistoryPosition, setCurrentHistoryPosition] = useState(null);

  useEffect(() => {
    chess.load_pgn(game.game.pgn);
    const chessHistory = chess.history();
    setHistory(chessHistory);
    setCurrentHistoryPosition(chessHistory.length);
    setFen(chess.fen())
  }, [chess, game.game.pgn]);

  function previousClick() {
    if (currentHistoryPosition === 0) {
      return;
    }
    const newCurrentHistoryPosition = currentHistoryPosition - 1
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function nextClick() {
    if(currentHistoryPosition === history.length) {
      return;
    }
    const newCurrentHistoryPosition = currentHistoryPosition + 1
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function endSequence() {
    const newCurrentHistoryPosition = history.length
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function beginningSequence() {
    const newCurrentHistoryPosition = 0
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function handleKeyPress(event) {
    if (event.key === 'ArrowUp') {
      endSequence()
    }
    if (event.key === 'ArrowDown') {
      beginningSequence()
    }
    if (event.key === 'ArrowLeft') {
      previousClick()
    }
    if (event.key === 'ArrowRight') {
      nextClick()
    }
  }

  function getFenForSequence(sequence){
    const nextChess = new Chess();
    sequence.forEach((move, i) => {
      nextChess.move(move);
    });
    return nextChess.fen()
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
        <UndoButton onClick={previousClick}>Previous</UndoButton>
        <UndoButton onClick={nextClick}>Next</UndoButton>
        <OrientationButton onClick={onOrientationClick}>Orientation</OrientationButton>
      </ButtonHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  max-width: 32vw;
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

const UndoButton = styled.button`
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-family: della-respira;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 8px;

  :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

const OrientationButton = styled.button`
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-family: della-respira;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;

  :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

export default GameBoard;
