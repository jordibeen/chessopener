import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Loader from "../common/loader";
import Error from "../common/error";

function LichessStats(opening) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}/api/openings/${opening.opening.id}/stats`)
      .then(res => res.json())
      .then((result) => {
        setStats(result);
        setIsLoaded(true);
      }, (error) => {
        setError(error);
        setIsLoaded(true);
      })

      return () => {
        setIsLoaded(false);
      }
  }, [opening])

  function generateTooltip(hovered) {
    switch(hovered){
      case 'white':
        return `white won ${stats.whiteWins} times`
      case 'draw':
        return `drawn ${stats.draws} times`
      case 'black':
        return `black won ${stats.blackWins} times`
      default:
        break;
    }
  }

  if(!isLoaded) {
    return <Loader />
  }

  if(error) {
    return <Error />
  }

  if(!stats) {
    return null;
  }

  const whiteWinPercentage = Math.round(stats.whiteWins / stats.amountPlayed * 100);
  const drawPercentage = Math.round(stats.draws / stats.amountPlayed * 100)
  const blackWinPercentage = Math.round(stats.blackWins / stats.amountPlayed * 100)

  return (
      <Wrapper>
        <GeneralStats>
          <PlayedLabel>Played <Played>{stats.amountPlayed}</Played> times</PlayedLabel>
          <RatingLabel>Avg. rating: <Rating>{stats.averageRating}</Rating></RatingLabel>
        </GeneralStats>
        <WinDistribution data-tip="" data-for="winDistribution">
          <WinDistributionLabel>Win Distribution</WinDistributionLabel>
          <SimpleBarChart>
            <WhiteBar value={whiteWinPercentage} onMouseOver={() => setHovered('white')} onMouseLeave={() => setHovered(null)} >
              {whiteWinPercentage}%
            </WhiteBar>
            <DrawBar value={drawPercentage} onMouseOver={() => setHovered('draw')} onMouseLeave={() => setHovered(null)} >
              {drawPercentage}%
            </DrawBar>
            <BlackBar value={blackWinPercentage} onMouseOver={() => setHovered('black')} onMouseLeave={() => setHovered(null)} >
              {blackWinPercentage}%
            </BlackBar>
          </SimpleBarChart>
          <ReactTooltip
             id="winDistribution"
             getContent={() => typeof hovered === 'string' ? generateTooltip(hovered) : null}
           />
        </WinDistribution>
      </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
`;

const GeneralStats = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.theme.colors.white};
  padding: 16px;
`;

const PlayedLabel = styled.div`
`;

const Played = styled.span`
  color: ${props => props.theme.colors.green};
`;

const RatingLabel = styled.div`
`;

const Rating = styled.span`
  color: ${props => props.theme.colors.green};
`;

const WinDistribution = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 32px;
  font-size: 14px;
`;

const WinDistributionLabel = styled.div`
  color: ${props => props.theme.colors.white};
  margin-bottom: 8px;
`;

const SimpleBarChart = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  border-radius: 2px;
  font-size: 16px;
`;

const BarEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${p => p.value}%;
`;

const WhiteBar = styled(BarEntry)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
`;

const DrawBar = styled(BarEntry)`
  background-color: ${props => props.theme.colors.lightgrey};
  color: ${props => props.theme.colors.white};
`;

const BlackBar = styled(BarEntry)`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
`;

export default LichessStats;
