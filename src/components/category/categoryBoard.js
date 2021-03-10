import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chessboard from 'chessboardjsx';
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css'

const Chess = require("chess.js");

const useStyles = makeStyles((theme) => ({
  categoryBoard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'hidden',
    overflowX: 'hidden',
    outline: 'none'
  },
  chessboardHolder: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     width: '100%',
     boxShadow: '0px 2px 6px #00000029',
     marginBottom: '24px'
   },
   buttonHolder: {
     marginTop: '24px',
     zIndex: '1'
   }
}));



function CategoryBoard(category) {
  const classes = useStyles();

  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);
  const [history, setHistory] = useState(null);
  const [currentHistoryPosition, setCurrentHistoryPosition] = useState(null);

  useEffect(() => {
    chess.load_pgn(category.category.sequence);
    const chessHistory = chess.history();
    setHistory(chessHistory);
    setCurrentHistoryPosition(chessHistory.length);
    setFen(chess.fen())
  }, []);

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

  function getFenForSequence(sequence){
    const nextChess = new Chess();
    sequence.forEach((move, i) => {
      nextChess.move(move);
    });
    return nextChess.fen()
  }

  function handleKeyPress(event) {
    console.log('keypress')
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

  if (!fen) return null;

  return (
    <div
      className={classes.categoryBoard}
      onKeyDown={handleKeyPress}
      tabIndex={-1}
    >
      <div className={classes.chessboardHolder}
        >
        <Chessground
            fen={fen}
            viewOnly={true}
          />
      </div>
      <div className={classes.buttonHolder}>
        <button onClick={previousClick}>previous</button>
        <button onClick={nextClick}>next</button>
      </div>
    </div>
  );
}

export default CategoryBoard;
