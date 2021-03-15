import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Chessground from 'react-chessground';


const Chess = require("chess.js");

function Explorer(opening) {
  const [chess] = useState(new Chess());
  const [lastMove, setLastMove] = useState();
  const [sequence, setSequence] = useState();
  const [openings, setOpenings] = useState([]);
  const [fen, setFen] = useState('start');

  useEffect(() => {
    if(!sequence) {
      setOpenings([]);
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}`)
    .then(res => res.json())
    .then((result) => {
      setOpenings(result);
    }, (error) => {
    })
  }, [sequence]);

  function onMove(from, to) {
    const legalMoves = chess.moves( { verbose: true })
    let move = null;
    legalMoves.forEach(m => {
      if(m.from == from && m.to == to){
        move = m;
      }
    });

    if(move) {
      chess.move(move);
      setLastMove([from, to]);
    } else {
      setFen('');
    }

    setFen(chess.fen());
    setSequence(getSequenceForHistory(chess.history()));
  };

  function getSequenceForHistory(history) {
    let sequence = '';
    let turn = 0;
    history.forEach((h, i) => {
      if((i + 1) % 2) {
        turn += 1;
        sequence += `${turn}.${h} `;
      } else {
        sequence += `${h} `;
      }
    });
    return sequence;
  }

  function onUndoClick(){
    chess.undo()
    setFen(chess.fen());
    setSequence(getSequenceForHistory(chess.history()));
  }

  if (!fen) return null;

  return (
    <Wrapper>
      <BoardWrapper>
        <BoardHolder>
          <Chessground
            lastMove={lastMove}
            onMove={onMove}
            fen={fen}
            animation={
              { enabled: false }
            }
          />
        </BoardHolder>
      </BoardWrapper>
      <ButtonHolder>
        <UndoButton onClick={onUndoClick}>Undo</UndoButton>
      </ButtonHolder>
      <InformationWrapper>
        <SequenceWrapper>
          <h2>Sequence</h2>
          <Sequence>{sequence}</Sequence>
        </SequenceWrapper>
        <MatchingOpeningsWrapper>
          {
              openings.map((opening) => {
                return (
                  <MatchingOpeningResult key={opening.id} >
                    <Link to={`/openings/${opening.id}`}>
                      <MatchingOpeningResultName>{opening.name}</MatchingOpeningResultName>
                      <MatchingOpeningResultSequence>{opening.sequence}</MatchingOpeningResultSequence>
                    </Link>
                  </MatchingOpeningResult>
                )
              })
          }
        </MatchingOpeningsWrapper>
      </InformationWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const BoardWrapper = styled.div`
  width: 70%;
  max-width: 640px;
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
  margin-top: 24px;
`;

const UndoButton = styled.button`
  background-color: red;
`;

const InformationWrapper = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
`;

const SequenceWrapper = styled.div`
  background-color: ${props => props.theme.colors.componentBackgroundHighlight};
`;

const Sequence = styled.span`
  font-size: 24px;
`;

const MatchingOpeningsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const MatchingOpeningResult = styled.div`
  border-bottom: 1px solid #eaeaea;
  background-color: ${props => props.theme.colors.componentBackground};

   :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.pink};
`;

const MatchingOpeningResultName = styled.p`
  font-size: 24px;
`;

const MatchingOpeningResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
`;

export default Explorer;
