import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function OpeningInformation(opening) {
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/stats`)
      .then(res => res.json())
      .then((result) => {
        setStats(result);
      }, (error) => {
      })
  }, [opening])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/games`)
      .then(res => res.json())
      .then((result) => {
        setGames(result);
      }, (error) => {
      })
  }, [opening])

  console.log(stats);
  console.log(games);
  if(!stats || !games) {
    return null;
  }
  return (
    <Wrapper>
      <OpeningDetailsWrapper>
        <EcoWrapper>
          <Eco>{opening.opening.eco}</Eco>
        </EcoWrapper>
        <NameSequenceWrapper>
          <Name>{opening.opening.name}</Name>
          <Sequence>{opening.opening.sequence}</Sequence>
        </NameSequenceWrapper>
      </OpeningDetailsWrapper>
      <LichessStatsWrapper>
        <p>Average rating: {stats.averageRating}</p>
        <p>Amount played: {stats.amountPlayed}</p>
        <p>White wins: {stats.whiteWins}</p>
        <p>Draws: {stats.draws}</p>
        <p>Black wins: {stats.blackWins}</p>
      </LichessStatsWrapper>
      <LichessGamesWrapper>
        {
          games.map((game) => {
            return (
              <LichessLink target='_blank' rel="noopener noreferrer" href={`https://lichess.org/${game.lichessId}`} >
                <LichessGame>
                  <p>{game.whiteName} ({game.whiteRating}) vs {game.blackName} ({game.blackRating})</p>
                  <p>Type: {game.speed}</p>
                  <p>Date: {game.playedAt}</p>
                  <p>Winner: {game.winner}</p>
                </LichessGame>
              </LichessLink>
            )
          })
        }
      </LichessGamesWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const LichessStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
`;

const LichessGamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  overflow: scroll;
`;

const LichessLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.lightgrey}
`;

const LichessGame = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
`;

export default OpeningInformation;
