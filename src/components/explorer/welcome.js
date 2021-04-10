import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function Welcome() {
  return (
    <Wrapper>
      <Helmet>
        <title>exploration board</title>
        <meta name="description" content="explore chess openings" />
      </Helmet>
      <Heading>
        chessopener.com
      </Heading>
      <Intro>
        easily <Highlight>explore</Highlight>, <Highlight>analyse</Highlight> and <Highlight>practice</Highlight> chess openings
      </Intro>
      <ApplicationInfo>
        start off by making a move on the <Highlight>exploration board</Highlight>, or <Highlight>press escape</Highlight> to search through openings by name
      </ApplicationInfo>
      <TechnicalInfo>
        this application connects an openings database to the <ExternalLink href='https://lichess.org/api' target='_blank' rel='noopener noreferrer'>lichess api</ExternalLink>,
        created with <ExternalLink href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>react</ExternalLink>, <ExternalLink href='https://redux.js.org/' target='_blank' rel='noopener noreferrer'>redux</ExternalLink>, <ExternalLink href='https://expressjs.com/' target='_blank' rel='noopener noreferrer'>express</ExternalLink> and <ExternalLink href='https://sequelize.org/' target='_blank' rel='noopener noreferrer'>sequelize</ExternalLink>
      </TechnicalInfo>
      <Outro>
        <ExternalLink href='https://www.buymeacoffee.com/jordaye' target='_blank' rel='noopener noreferrer'>buy me a coffee</ExternalLink>
      </Outro>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;

  @media (${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

const Heading = styled.h1`
  display: block;
  text-align: center;
  color: ${props => props.theme.colors.white};
  font-size: 36px;
  margin-bottom: 32px;
`;

const Intro = styled.p`
  text-align: center;
  font-size: 24px;
  margin-bottom: 32px;
`;

const ApplicationInfo = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 32px;
`;

const TechnicalInfo = styled.div`
  text-align: center;
  font-size: 14px;

  @media (${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 64px;
  }
`;

const Highlight = styled.span`
  color: ${props => props.theme.colors.green};
`;

const Outro = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 4px;
  margin-right: 8px;
  font-size: 14px;
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.colors.green};
`;

export default Welcome;
