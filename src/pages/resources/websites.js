import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout.js';
import { graphql } from 'gatsby';
import { Container } from '../../styles/baseStyles';
import { MdExpandMore } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import Link from '../../components/Link.js';
import AddNewButton from '../../components/AddNewButton';

export const websitesQuery = graphql`
  {
    websites: allAirtableWebsites(filter: { data: { publish: { eq: true } } }) {
      edges {
        node {
          data {
            name
            link
            description
          }
          recordId
        }
      }
    }
  }
`;

export default function Websites({ data: { websites } }) {
  return (
    <Layout>
      <Container narrow>
        <WebsitesContainer>
          {websites.edges.map(({ node }) => (
            <WebsiteItem to={node.data.link} key={node.recordId}>
              <Main>
                <Title>{node.data.name}</Title>
                <Description>{node.data.description}</Description>
              </Main>
              <Actions>
                <FiExternalLink />
              </Actions>
            </WebsiteItem>
          ))}
        </WebsitesContainer>
      </Container>
      <AddNewButton link="https://airtable.com/shrGoeiQgcDomTh6D">Add Website</AddNewButton>
    </Layout>
  );
}

const WebsitesContainer = styled.div`
  margin: 5rem 0;
  @media screen and (max-width: 720px) {
    margin: 0.5rem 0 3rem;
  }
`;

const WebsiteItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  padding: 2rem;
  border-radius: 0.55rem;
  svg {
    margin-right: 1rem;
  }
  @media screen and (max-width: 720px) {
    flex: 0 0 100%;
    margin: 0 0 2rem 0;
    align-items: flex-start;
  }
`;

const Main = styled.div`
  flex: 0 0 70%;
  @media screen and (max-width: 720px) {
    flex: 0 0 80%;
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Description = styled.p``;

const Actions = styled.div`
  svg {
    height: 22px;
    width: 22px;
  }
`;

const ReadMore = styled.div``;
