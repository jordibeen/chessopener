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

  coords {
    display: none;
  }

  .cg-custom-svgs {
    display: none;
  }
`;

export default OpeningOfTheDayPreviewBoard;
