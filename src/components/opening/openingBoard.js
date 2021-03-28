import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

import Button from "../common/button";

const Chess = require("chess.js");

function OpeningBoard(opening) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);
  const [history, setHistory] = useState(null);
  const [orientation, setOrientation] = useState(false);
  const [historyPosition, setHistoryPosition] = useState(null);

  useEffect(() => {
    chess.load_pgn(opening.opening.sequence);
    const chessHistory = chess.history();
    setHistory(chessHistory);
    setHistoryPosition(chessHistory.length);
    setFen(chess.fen())
  }, [chess, opening.opening.sequence]);

  useEffect(() => {
    document.addEventListener('keydown', keydownFunc, false);
    return () => document.removeEventListener('keydown', keydownFunc, false);
  });

  function goToPosition(position) {
      const sequence = history.slice(0, position);
      const positionFen = generateFen(sequence);
      setHistoryPosition(position);
      setFen(positionFen);
  }

  function generateFen(sequence){
    const nextChess = new Chess();
    sequence.forEach((move, i) => {
      nextChess.move(move);
    });
    return nextChess.fen()
  }

  function previousPosition() {
    if (historyPosition === 0) {
      return;
    }
    goToPosition(historyPosition - 1);
  }

  function nextPosition() {
    if(historyPosition === history.length) {
      return;
    }
    goToPosition(historyPosition + 1);
  }

  function endPosition() {
    goToPosition(history.length);
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
      <SequenceHolder>
        {
          history.map((hist, i) => {
            let seq = null;
            if(!(i % 2)){
              seq = `${i / 2 + 1}.${hist}`;
            } else {
              seq = hist;
            }
            return(<Sequence key={i} onClick={() => {goToPosition(i + 1)}} active={(i + 1) === historyPosition}>{seq}</Sequence>)
          })
        }
      </SequenceHolder>
      <ButtonHolder>
        <PreviousButton onClick={previousPosition}>Previous</PreviousButton>
        <NextButton onClick={nextPosition}>Next</NextButton>
        <OrientationButton onClick={onOrientationClick}>Switch Orientation</OrientationButton>
      </ButtonHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
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

const SequenceHolder = styled.div`
  margin-top: 32px;
  background-color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 4px;
  color: ${props => props.theme.colors.white};
  padding: 8px;
  overflow: scroll;
  font-weight: bold;
  word-break: break-all;
`;

const Sequence = styled.span`
  margin-left: 12px;
  cursor: pointer;
  ${p => p.active ?
      `border-bottom: 2px solid ${p.theme.colors.green}` : null
  }
`;

const ButtonHolder = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const PreviousButton = styled(Button)`
  margin-right: 16px;
`;

const NextButton = styled(Button)`
  margin-right: 16px;
`;

const OrientationButton = styled(Button)`
`;

export default OpeningBoard;
