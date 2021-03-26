import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Chessground from 'react-chessground';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SET_EXPLORER_SEQUENCE } from 'redux/reducers/explorer';

const Chess = require("chess.js");


function Explorer(opening) {
  const dispatch = useDispatch();
  const storedExplorerSequence = useSelector(state => state.explorer.sequence);

  const [chess] = useState(new Chess());
  const [restore, setRestore] = useState(storedExplorerSequence ? true : false);
  const [lastMove, setLastMove] = useState();
  const [sequence, setSequence] = useState(storedExplorerSequence);
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
      dispatch({
        type: SET_EXPLORER_SEQUENCE,
        payload: sequence
      });
    }, (error) => {
    })
  }, [sequence, dispatch]);

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

  useEffect(() => {
    if(restore){
      chess.load_pgn(sequence);
      setRestore(false);
      setFen(chess.fen());
    }
  }, [restore, chess, sequence])

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
    // Remove trailing space from sequence string to match current sequence in searches
    return sequence.slice(0, -1);
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

  function getSequenceMatchString(search, sequence) {
    const leftOver = sequence.replace(search, '');

    return (
      <MatchingOpeningResultSequence>
        <Match>{search}</Match>
        <LeftOver>{leftOver}</LeftOver>
      </MatchingOpeningResultSequence>
    )

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
        <Header>
          <Sequence>{
            sequence ?
              sequence :
              'play an opening to show results'
          }</Sequence>
          {
            count ?
            <SequenceCount>{count} results</SequenceCount> : null
          }
        </Header>

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
                      <Link to={`/openings/${opening.slug}`}>
                        <MatchingOpeningResultName>[{opening.eco}] {opening.name}</MatchingOpeningResultName>
                        { getSequenceMatchString(sequence, opening.sequence) }
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
  width: 60%;
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
  font-family: della-respira;
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
  font-family: della-respira;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 16px;
  cursor: pointer;

  :hover {
     background-color: ${props => props.theme.colors.componentBackgroundHighlight};
   }
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;
`;

const Header = styled.div`
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  padding: 16px;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 2px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
`;

const Match = styled.span`
  color: ${props => props.theme.colors.green};
`;

const LeftOver = styled.span`
`;

const SequenceCount = styled.div`
  margin-top: 6px;
  color: ${props => props.theme.colors.white};
`;

const MatchingOpeningsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const MatchingOpeningResult = styled.div`
  margin: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  padding: 16px 0;
  cursor: pointer;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.green};
`;

const MatchingOpeningResultName = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 8px;
  font-weight: bold;
`;

const MatchingOpeningResultSequence = styled.p`
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.lightgrey};
  letter-spacing: 1px;
`;

export default Explorer;
