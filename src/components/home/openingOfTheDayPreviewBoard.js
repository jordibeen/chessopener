import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

const Chess = require("chess.js");

function OpeningOfTheDayPreviewBoard(opening) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);

  useEffect(() => {
    chess.load_pgn(opening.opening.sequence);
    setFen(chess.fen())
  }, [chess, opening.opening.sequence]);

  if (!fen) return null;

  return (
    <Wrapper>
      <Chessground
        fen={fen}
        viewOnly={true}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .cg-wrap {
    height: 512px;
    width: 512px;
    z-index: 0;
  }

  coords {
    display: none;
  }
`;

export default OpeningOfTheDayPreviewBoard;
