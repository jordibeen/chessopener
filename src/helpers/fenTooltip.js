import styled, { useTheme } from 'styled-components';
import Chessground from 'react-chessground';

function generateFenTooltip(fen) {
  return (
    <Wrapper>
      <BoardHolder>
        <Chessground
          fen={fen}
          viewOnly={true}
        />
      </BoardHolder>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 256px;
  height: 256px;
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

  coords {
    display: none;
  }
`;

export {
    generateFenTooltip
}
