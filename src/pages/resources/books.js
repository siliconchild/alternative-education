import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout.js';
import { Container } from '../../styles/baseStyles.js';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Link from '../../components/Link';
import AddNewButton from '../../components/AddNewButton';

export const bookQuery = graphql`
  query {
    books: allAirtableBooks(filter: { data: { publish: { eq: true } } }) {
      edges {
        node {
          recordId
          data {
            author
            name
            link
            cover {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Books({ data: { books } }) {
  return (
    <Layout>
      <Container>
        <BookGrid>
          {books.edges.map(({ node }) => (
            <Book key={node.recordId} to={node.data.link}>
              <Image fluid={node.data.cover.localFiles[0].childImageSharp.fluid} />
              <h5>{node.data.name}</h5>
              <p>{node.data.author}</p>
            </Book>
          ))}
        </BookGrid>
      </Container>
      <AddNewButton link="https://airtable.com/shrkYRzshU92rnuoR">Add Book</AddNewButton>
    </Layout>
  );
}

const BookGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem 0;
  @media screen and (max-width: 720px) {
    margin: 1rem 0;
  }
  & > * {
    flex: 0 0 calc(20% - 3.2rem);
    margin-bottom: 2rem;
    @media screen and (max-width: 720px) {
      flex: 0 0 calc(50% - 1rem);
      margin-bottom: 2rem;
    }
    &:not(:nth-child(n + 5)) {
      margin-right: 4rem;
      @media screen and (max-width: 720px) {
        margin-right: 0;
      }
    }
    &:not(:nth-child(even)) {
      @media screen and (max-width: 720px) {
        margin-right: 2rem;
      }
    }
  }
`;
const Book = styled(Link)`
  h5 {
    margin: 1.5rem 1rem 0.5rem;
    color: var(--text-dark);
  }
  p {
    margin: 0 1rem 1rem;
  }
`;
const Image = styled(Img)`
  height: 30rem;
  border-radius: 1.5rem;
  object-fit: contain;
  @media screen and (max-width: 720px) {
    height: 26rem;
  }
`;
