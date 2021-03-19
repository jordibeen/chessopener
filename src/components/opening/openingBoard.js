import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chessground from 'react-chessground';

const Chess = require("chess.js");

function OpeningBoard(opening) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(null);
  const [history, setHistory] = useState(null);
  const [orientation, setOrientation] = useState(false);
  const [currentHistoryPosition, setCurrentHistoryPosition] = useState(null);

  useEffect(() => {
    chess.load_pgn(opening.opening.sequence);
    const chessHistory = chess.history();
    setHistory(chessHistory);
    setCurrentHistoryPosition(chessHistory.length);
    setFen(chess.fen())
  }, [chess, opening.opening.sequence]);

  function previousClick() {
    if (currentHistoryPosition === 0) {
      return;
    }
    const newCurrentHistoryPosition = currentHistoryPosition - 1
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function nextClick() {
    if(currentHistoryPosition === history.length) {
      return;
    }
    const newCurrentHistoryPosition = currentHistoryPosition + 1
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function endSequence() {
    const newCurrentHistoryPosition = history.length
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function beginningSequence() {
    const newCurrentHistoryPosition = 0
    const sequence = history.slice(0, newCurrentHistoryPosition);
    const nextFen = getFenForSequence(sequence);
    setCurrentHistoryPosition(newCurrentHistoryPosition);
    setFen(nextFen);
  }

  function handleKeyPress(event) {
    if (event.key === 'ArrowUp') {
      endSequence()
    }
    if (event.key === 'ArrowDown') {
      beginningSequence()
    }
    if (event.key === 'ArrowLeft') {
      previousClick()
    }
    if (event.key === 'ArrowRight') {
      nextClick()
    }
  }

  function getFenForSequence(sequence){
    const nextChess = new Chess();
    sequence.forEach((move, i) => {
      nextChess.move(move);
    });
    return nextChess.fen()
  }

  function onOrientationClick(){
    setOrientation(!orientation);
  }

  if (!fen) return null;

  return (
    <Wrapper>
      <BoardWrapper>
        <BoardHolder>
          <Chessground
            fen={fen}
            viewOnly={true}
            orientation={
              orientation ? 'black' : 'white'
            }
          />
        </BoardHolder>
        <ButtonHolder>
          <UndoButton onClick={previousClick}>Previous</UndoButton>
          <UndoButton onClick={nextClick}>Next</UndoButton>
          <OrientationButton onClick={onOrientationClick}>Orientation</OrientationButton>
        </ButtonHolder>
      </BoardWrapper>
      <InformationWrapper>
        <OpeningDetailsWrapper>
          <EcoWrapper>
            <Eco>{opening.opening.eco}</Eco>
          </EcoWrapper>
          <NameSequenceWrapper>
            <Name>{opening.opening.name}</Name>
            <Sequence>{opening.opening.sequence}</Sequence>
          </NameSequenceWrapper>
        </OpeningDetailsWrapper>
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
  width: 50%;
  max-width: 32vw;
  height: 100%;
  background-color: ${props => props.theme.colors.componentBackground};
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: 12px;
`;

const OpeningDetailsWrapper = styled.div`
  background-color: ${props => props.theme.colors.black};
  height: 64px;
  border: none;
  width: 100%;
  display: flex;
  border-radius: 12px 12px 0 0;
`;

const EcoWrapper = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Eco = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2px;
`;

const NameSequenceWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.span`
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  font-size: 18px;
`;

const Sequence = styled.span`
  color: ${props => props.theme.colors.green};
  font-style: italic;
  font-size: 14px;
  letter-spacing: 1px;
`;

export default OpeningBoard;
