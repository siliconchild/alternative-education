import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout.js';
import { Container } from '../styles/baseStyles';
import ResourcesPreview from '../components/ResoucesPreview';

export default function Resources() {
  return (
    <Layout>
      <Container>
        <ResoucesPreviewPageContainer>
          <ResourcesPreview />
        </ResoucesPreviewPageContainer>
      </Container>
    </Layout>
  );
}

const ResoucesPreviewPageContainer = styled.div`
  margin: 7rem 0;
  @media screen and (max-width: 720px) {
    margin: 1rem 0 7rem;
  }
`;
