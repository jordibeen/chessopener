import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

const Chess = require("chess.js");

function CategoryPreviewBoard(category) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);

  useEffect(() => {
    chess.load_pgn(category.category.sequence);
    setFen(chess.fen())
  }, [chess, category.category.sequence]);

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
  width: 100%;

  .cg-wrap {
    height: 104px;
    width: 104px;
    z-index: 0;
  }

  coords {
    display: none;
  }
`;

export default CategoryPreviewBoard;
