import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/baseStyles';
import ResourcesPreview from '../components/ResoucesPreview';

export default function Resources() {
  return (
    <Container>
      <ResoucesPreviewPageContainer>
        <ResourcesPreview />
      </ResoucesPreviewPageContainer>
    </Container>
  );
}

const ResoucesPreviewPageContainer = styled.div`
  margin: 7rem 0;
  @media screen and (max-width: 720px) {
    margin: 1rem 0 7rem;
  }
`;
