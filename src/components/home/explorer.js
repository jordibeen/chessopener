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
      if(m.from === from && m.to === to){
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
        <SequenceWrapper>
          <Sequence>{
            sequence ?
              sequence :
              'play an opening to show results'
          }</Sequence>
        </SequenceWrapper>
        {
          count ?
          <SequenceCount>({count}) results</SequenceCount> : null
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
                        <MatchingOpeningResultName>[{opening.eco}] {opening.name}</MatchingOpeningResultName>
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
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-family: menlo;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 8px;

  :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

const OrientationButton = styled.button`
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-family: menlo;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;

  :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
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
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  padding: 16px;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 2px;
  width: 100%;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.white};
  font-size: 1.6rem;
  font-weight: bold;
`;

const SequenceCount = styled.div`
  text-align: right;
  padding: 8px;
  color: ${props => props.theme.colors.green};
`;

const MatchingOpeningsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const MatchingOpeningResult = styled.div`
  margin: 0 8px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};

  :hover {
   background-color: ${props => props.theme.colors.componentBackgroundHighlight};
  }

  /* ::after {
    content: "";
    width: 0px;
    height: 3px;
    background-color: ${props => props.theme.colors.green};
    border-radius: 1px;
  } */
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const MatchingOpeningResultName = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
`;

const MatchingOpeningResultSequence = styled.p`
  font-size: 12px;
  font-style: italic;
  color: ${props => props.theme.colors.default};
`;

export default Explorer;
