import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Chessboard from 'chessboardjsx';
const Chess = require("chess.js");

function OpeningBoard(opening) {
    const [chess] = useState(new Chess());
    const [fen, setFen] = useState(chess.fen());

    useEffect(() => {
        chess.load_pgn(opening.opening.sequence);
        setFen(chess.fen())
    });

  return (
    <Wrapper>
        <Chessboard position={fen} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
`;

export default OpeningBoard;
