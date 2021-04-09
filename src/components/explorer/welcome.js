import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function Welcome() {
  return (
    <Wrapper>
      <Helmet>
        <title>welcome to chessopener.com</title>
        <meta name="description" content="C" />
      </Helmet>
      <Heading>
        welcome to chessopener.com
      </Heading>
      <Intro>
        this application was created as a way to explore, analyse and practice chess openings by combining an openings database to
        the <ExternalLink href='https://lichess.org/api' target='_blank' rel='noopener noreferrer'>lichess api</ExternalLink>
      </Intro>
      <ApplicationInfo>
        start off by playing an opening on the <Highlight>explorer board</Highlight>, or <Highlight>press escape</Highlight> to search through openings by name
      </ApplicationInfo>
      <Outro>
        enjoy this product? consider <ExternalLink href='https://www.buymeacoffee.com/jordaye' target='_blank' rel='noopener noreferrer'>buying me a coffee</ExternalLink>
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
  font-size: 18px;
  margin-bottom: 32px;
`;

const ApplicationInfo = styled.div`
  text-align: center;
  font-size: 18px;

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
  font-size: 16px;
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.colors.green};
`;

export default Welcome;
