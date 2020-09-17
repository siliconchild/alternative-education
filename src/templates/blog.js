import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/baseStyles.js';
import BlogCard from '../components/BlogCard.js';
import { graphql, Link } from 'gatsby';
import ReadingSVG from '../images/reading.svg';
import { Button } from '../styles/baseStyles.js';

export const blogQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    blogs: allAirtableBlog(
      filter: { data: { publish: { eq: true } } }
      sort: { fields: data___published, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          recordId
          data {
            title
            banner {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            author
            content {
              childMarkdownRemark {
                excerpt(pruneLength: 240)
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
`;

export default function blog({ data: { blogs }, pageContext }) {
  return (
    // <Layout>
    //   <Container>
    //     <BlogContainer>
    //       <Main>
    //         {blogs.edges
    //           .filter((_, index) => String(index).match(new RegExp('[012]')))
    //           .map(({ node }) => (
    //             <BlogCard key={node.recordId} props={{ ...node.data, column: true }} />
    //           ))}
    //       </Main>
    //       <SideBar>
    //         <Content>
    //           <img height="150" src={ReadingSVG} alt="section header logo" />
    //           <Button gradient>I Have A Story To Share</Button>
    //           <p>
    //             Feel Free to Write Us About Your Learning Journeys, Experieces &amp; Reflections. We will Feature it
    //             Here
    //           </p>
    //         </Content>
    //         {blogs.edges
    //           .filter((_, index) => String(index).match(new RegExp('[345]')))
    //           .map(({ node }) => (
    //             <BlogCard key={node.recordId} props={{ ...node.data, column: true, mini: true }} />
    //           ))}
    //       </SideBar>
    //     </BlogContainer>
    //   </Container>
    // </Layout>

    <Container>
      <BlogGrid>
        {blogs.edges
          // .filter((_, index) => String(index).match(new RegExp('[012]')))
          .map(({ node }) => (
            <BlogCard key={node.recordId} props={{ ...node.data, slug: node.fields.slug, column: false }} />
          ))}
      </BlogGrid>
      <Navigation>
        {pageContext.previousPagePath && <Link to={pageContext.previousPagePath}>Previous Page</Link>}
        {pageContext.numberOfPages > pageContext.pageNumber + 1 && <Link to={pageContext.nextPagePath}>Next Page</Link>}
      </Navigation>
    </Container>
  );
}

const BlogGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem 0 0;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    margin: 2rem 0;
  }
  & > * {
    flex: 0 0 calc(33.33% - 4rem);
    margin-bottom: 6rem;
    @media screen and (max-width: 720px) {
      flex: 0 0 100%;
      margin-bottom: 0;
    }
    &:not(:last-child) {
      margin-right: 4rem;
      @media screen and (max-width: 720px) {
        margin-right: 0;
        margin-bottom: 6rem;
      }
    }
  }
`;

const Navigation = styled.div`
  margin: 0 0 4rem;
  display: flex;
  justify-content: center;
  a {
    margin: 0 1.5rem;
  }
`;

// const BlogContainer = styled.div`
//   display: flex;
//   margin: 6rem 0 8rem;
//   @media screen and (max-width: 720px) {
//     flex-direction: column-reverse;
//   }
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   p {
//     text-align: center;
//     margin: 6.5rem 0 4.5rem;
//   }

//   button {
//   }
// `;

// const Main = styled.div`
//   flex: 0 0 calc(66.66% - 8rem);
//   margin: 0 8rem 0 0;
//   padding-top: 1rem;
//   @media screen and (max-width: 720px) {
//     flex: 0 0 100%;
//     margin: 0;
//   }
//   & > * {
//     &:not(:last-child) {
//       margin-bottom: 6rem;
//     }
//   }
// `;

// const SideBar = styled.div`
//   flex: 0 0 33.33%;
//   & > * {
//     &:not(:last-child) {
//       margin-bottom: 4rem;
//     }
//   }
// `;
