import React from 'react';
import styled from 'styled-components';

function Welcome() {
  return (
    <Wrapper>
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
        enjoying this product? consider <ExternalLink href='https://www.buymeacoffee.com/jordaye' target='_blank' rel='noopener noreferrer'>buying me a coffee</ExternalLink>
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
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 38px;
  display: block;
  color: ${props => props.theme.colors.white};
  margin-bottom: 32px;
`;

const Intro = styled.p`
  text-align: center;
  font-size: 16px;
  margin-bottom: 32px;
`;

const ApplicationInfo = styled.div`
  text-align: center;
  font-size: 16px;
  margin-bottom: 32px;
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
