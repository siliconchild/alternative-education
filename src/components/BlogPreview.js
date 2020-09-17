import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import BlogCard from './BlogCard.js';

export default function BlogPreview() {
  const { allAirtableBlog } = useStaticQuery(graphql`
    {
      allAirtableBlog(
        filter: { data: { publish: { eq: true } } }
        limit: 3
        sort: { fields: data___published, order: [DESC] }
      ) {
        edges {
          node {
            recordId
            data {
              title
              banner {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              author
              content {
                childMarkdownRemark {
                  excerpt(pruneLength: 215)
                }
              }
              published
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <BlogPreviewContainer>
      <Title>Blog</Title>
      <BlogPreviewGrid>
        {allAirtableBlog.edges.map(({ node }) => (
          <BlogCard key={node.recordId} props={{ ...node.data, slug: node.fields.slug }} />
        ))}
      </BlogPreviewGrid>
    </BlogPreviewContainer>
  );
}

const BlogPreviewContainer = styled.div``;

const Title = styled.h2`
  font-size: 2.7rem;
  margin-bottom: 5rem;
`;

const BlogPreviewGrid = styled.div`
  display: flex;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }

  & > * {
    flex: 0 0 calc(33.33% - 5.32rem);
    @media screen and (max-width: 720px) {
      flex: 1;
    }
    &:not(:last-child) {
      margin-right: 8rem;
      @media screen and (max-width: 720px) {
        margin: 0 0 6rem 0;
      }
    }
  }
`;
