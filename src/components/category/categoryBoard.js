import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chessboard from 'chessboardjsx';
const Chess = require("chess.js");

const useStyles = makeStyles((theme) => ({
  categoryBoard: {
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

function CategoryBoard(category) {
  const classes = useStyles();

  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());

  useEffect(() => {
    chess.load_pgn(category.category.sequence);
    console.log(chess.fen());
    setFen(chess.fen())
  });

  return (
    <div className={classes.categoryBoard}>
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

export default CategoryBoard;
