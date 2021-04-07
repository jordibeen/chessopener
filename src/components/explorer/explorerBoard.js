import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

import { getSequenceForHistory } from 'helpers/chess';
import Button from "../common/button";


const Chess = require("chess.js");


function ExplorerBoard({ sequence, setSequence }) {
  const [chess] = useState(new Chess());
  const [lastMove, setLastMove] = useState(null);
  const [orientation, setOrientation] = useState(false);
  const [fen, setFen] = useState('start');

  useEffect(() => {
    if(sequence !== null){
      chess.load_pgn(sequence);
      setFen(chess.fen());
    }
  }, [chess, sequence])

  function onMove(from, to) {
    const legalMoves = chess.moves( { verbose: true })
    let move = null;
    legalMoves.forEach(m => {
      if(m.from === from && m.to === to){
        move = m;
      }
    });

    if(move) {
      chess.move(move);
      setLastMove([from, to]);
      setSequence(getSequenceForHistory(chess.history()));
    } else {
      // Illegal move!
      setLastMove(chess.history().slice(-1))
    }
  };


  function onResetClick(){
    setSequence('');
    setLastMove(null);
  }

  function onUndoClick(){
    chess.undo()
    setSequence(getSequenceForHistory(chess.history()));
  }

  function onOrientationClick(){
    setOrientation(!orientation);
  }

  return (
    <Wrapper>
      <BoardHolder>
        <Chessground
          lastMove={lastMove}
          onMove={onMove}
          fen={fen}
          animation={
            { enabled: false }
          }
          orientation={
            orientation ? 'black' : 'white'
          }
        />
      </BoardHolder>
      <ButtonHolder>
        <UndoButton onClick={onUndoClick}>undo</UndoButton>
        <ResetButton onClick={onResetClick}>reset</ResetButton>
        <OrientationButton onClick={onOrientationClick}>swap orientation</OrientationButton>
      </ButtonHolder>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  max-width: 32vw;

  @media (${props => props.theme.breakpoints.mobile}) {
    width: 90%;
    max-width: none;
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

const UndoButton = styled(Button)`
  margin-right: 16px;
`;

const ResetButton = styled(Button)`
  margin-right: 16px;
`;

const OrientationButton = styled(Button)`
`;

export default ExplorerBoard;
