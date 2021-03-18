import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Chessground from 'react-chessground';
import InfiniteScroll from 'react-infinite-scroll-component';


const Chess = require("chess.js");

function Explorer(opening) {
  const [chess] = useState(new Chess());
  const [lastMove, setLastMove] = useState();
  const [sequence, setSequence] = useState();
  const [count, setCount] = useState(0);
  const [openings, setOpenings] = useState([]);
  const [orientation, setOrientation] = useState(false);
  const [fen, setFen] = useState('start');
  const limit = 50;
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(false);

  useEffect(() => {
    if(!sequence) {
      setCount(0);
      setOpenings([]);
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}&limit=${limit}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setOpenings(result.rows);
    }, (error) => {
    })
  }, [sequence]);

  useEffect(() => {
    const page = Math.ceil(openings.length / limit);
    const nextOffset = page * limit;
    if(nextOffset < count) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setOffset(nextOffset);
}, [openings, count])

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

  function onOrientationClick(){
    setOrientation(!orientation);
  }

  function fetchData(){
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings?sequence=${sequence}&limit=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then((result) => {
      setCount(result.count);
      setOpenings(openings.concat(result.rows));
    }, (error) => {
    })
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
            orientation={
              orientation ? 'black' : 'white'
            }
          />
        </BoardHolder>
        <ButtonHolder>
          <UndoButton onClick={onUndoClick}>Undo</UndoButton>
          <OrientationButton onClick={onOrientationClick}>Switch Orientation</OrientationButton>
        </ButtonHolder>
      </BoardWrapper>
      <InformationWrapper id='InformationWrapper'>
        {
            count ?
            <SequenceWrapper>
              <h2>{count} openings in database for sequence:</h2>
              <Sequence>{sequence}</Sequence>
            </SequenceWrapper> : null
        }
        <MatchingOpeningsWrapper id='MatchingOpeningsWrapper'>
          <InfiniteScroll
            dataLength={openings.length}
            next={fetchData}
            hasMore={hasMore}
            scrollableTarget={'MatchingOpeningsWrapper'}
          >
            {
                openings.map((opening) => {
                  return (
                    <MatchingOpeningResult key={opening.id} >
                      <Link to={`/openings/${opening.id}`}>
                        <MatchingOpeningResultName>{opening.name} ({opening.eco})</MatchingOpeningResultName>
                        <MatchingOpeningResultSequence>{opening.sequence}</MatchingOpeningResultSequence>
                      </Link>
                    </MatchingOpeningResult>
                  )
                })
            }
          </InfiniteScroll>
        </MatchingOpeningsWrapper>
      </InformationWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;

const BoardWrapper = styled.div`
  width: 50%;
  max-width: 32vw;
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
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const UndoButton = styled.button`
  background-color: red;
`;

const OrientationButton = styled.button`
  background-color: green;
`;

const InformationWrapper = styled.div`
  width: 50%;
  max-width: 32vw;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  display: flex;
  flex-direction: column;
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
  color: ${props => props.theme.colors.green};
`;

const MatchingOpeningResultName = styled.p`
  font-size: 24px;
`;

const MatchingOpeningResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
`;

export default Explorer;
