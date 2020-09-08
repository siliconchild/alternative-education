import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/baseStyles.js';
import Hero from '../components/Hero.js';
import GridMenu from '../components/GridMenu.js';
import ResoucesPreview from '../components/ResoucesPreview.js';
import Events from '../components/Events.js';
import BlogPreview from '../components/BlogPreview.js';

export default function Home() {
  return (
    <Container>
      <HomePage>
        <Hero />
        <GridMenu />
        <ResoucesPreview column="true" />
        <Events />
        <BlogPreview />
      </HomePage>
    </Container>
  );
}

const HomePage = styled.div`
  & > *:not(:first-child) {
    margin-bottom: 10rem;
    @media screen and (max-width: 720px) {
      margin-bottom: 5rem;
    }
  }
  & > *:first-child {
    margin-bottom: 5rem;
    @media screen and (max-width: 720px) {
      margin-bottom: 2rem;
    }
  }
`;
