import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout.js';
import Hero from '../components/Hero.js';
import { Container } from '../styles/baseStyles.js';
import GridMenu from '../components/GridMenu.js';
import Events from '../components/Events.js';
import ResoucesPreview from '../components/ResoucesPreview.js';
import BlogPreview from '../components/BlogPreview.js';

export default function Home() {
  return (
    <Layout>
      <Container>
        <HomePage>
          <Hero />
          <GridMenu />
          <ResoucesPreview column="true" />
          <Events />
          <BlogPreview />
        </HomePage>
      </Container>
    </Layout>
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
