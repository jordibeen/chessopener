import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chessboard from 'chessboardjsx';
const Chess = require("chess.js");

const useStyles = makeStyles((theme) => ({
  openingBoard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chessboardHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxShadow: '0px 2px 6px #00000029'
  }
}));

function OpeningBoard(opening) {
  const classes = useStyles();

  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());

  useEffect(() => {
    chess.load_pgn(opening.opening.sequence);
    setFen(chess.fen())
  });

  return (
    <div className={classes.openingBoard}>
      <div className={classes.chessboardHolder}>
        <Chessboard
          draggable={false}
          position={fen}
          lightSquareStyle={ {backgroundColor: '#DEE3E6'} }
          darkSquareStyle={ {backgroundColor: '#788a94'} }
        />
      </div>
    </div>
  );
}

export default OpeningBoard;
