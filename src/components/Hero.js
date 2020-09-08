import React from 'react';
import styled from 'styled-components';
import Banner from '../images/idea.svg';

export default function Hero() {
  return (
    <HeroContainer>
      <Content>
        <Title>Who We Are</Title>
        <p>
          Alternative Education is a completely open and non-hierarchical community. Our intention is to bring together
          individuals and institutions in the alternative education space and to awake questioning about the fundamental
          issues in education. We intend to be a starting point in your search to explore alternatives in education. We
          are a democratic community and your inputs reflect how the community is structured. Feel free to mail us or
          use the chat group to give us inputs and solutions as to how we should move forward.
        </p>
      </Content>
      <Image src={Banner} />
    </HeroContainer>
  );
}

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    margin-top: 2rem;
  }
`;

const Content = styled.div`
  flex: 0 0 45%;
  @media screen and (max-width: 720px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 720px) {
    margin: 1rem 0 3.5rem;
  }
`;

const Image = styled.img`
  height: 45rem;
  padding: 3rem 5rem;
  @media screen and (max-width: 720px) {
    height: 35rem;
    margin: 3rem 0 2rem;
    padding: 3rem;
  }
`;
