import React, { useState } from 'react';
import styled from 'styled-components';

import Chessboard from 'chessboardjsx';
import { ShortMove } from "chess.js";
const Chess = require("chess.js");

function Home() {
    const ruy = "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 1";
    const [chess] = useState(new Chess(ruy));

    const [fen, setFen] = useState(chess.fen());

    const handleMove = (move: ShortMove) => {
      if (chess.move(move)) {
        setFen(chess.fen());
      }
    };


  return (
    <Wrapper>
      <Content>
        <h1>Home</h1>
        <p>Your randomly selected chess opening of the day is: Ruy Lopez</p>
        <Chessboard
            position={fen}
            onDrop={(move) =>
              handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: "q",
                })
            }
        />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 48px);
`;

const Content = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 0;
  padding: 24px;
`;

export default Home;
