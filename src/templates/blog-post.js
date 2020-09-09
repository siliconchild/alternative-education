import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Container } from '../styles/baseStyles';
import Img from '../components/Image';
import sanitizeHtml from 'sanitize-html';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiTimerLine } from 'react-icons/ri';

export const blogPostQuery = graphql`
  query($slug: String!) {
    blog: airtableBlog(data: { slug: { eq: $slug } }) {
      data {
        title
        author
        content {
          childMarkdownRemark {
            html
            timeToRead
          }
        }
        published
        banner {
          localFiles {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

export default function BlogPost({
  data: {
    blog: {
      data: { title, author, content, published, banner },
    },
  },
}) {
  const cleanHTML = sanitizeHtml(content.childMarkdownRemark.html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  });
  return (
    <Container narrow>
      <BlogPostContainer>
        <Image fluid={banner.localFiles[0].childImageSharp.fluid} />
        <Meta>
          <SubTitle>
            <BsFillPersonFill /> {author}
          </SubTitle>
          <SubTitle>
            <RiTimerLine /> {`${content.childMarkdownRemark.timeToRead}m read`}{' '}
          </SubTitle>
        </Meta>
        <h1>{title}</h1>
        <Content
          dangerouslySetInnerHTML={{
            __html: cleanHTML,
          }}></Content>
      </BlogPostContainer>
    </Container>
  );
}

const BlogPostContainer = styled.div`
  margin: 3rem 0 5rem;
  @media screen and (max-width: 720px) {
    margin: 0.5rem 0 2rem;
  }
  h1 {
    margin-bottom: 2.5rem;
    @media screen and (max-width: 720px) {
      font-size: 3rem;
      margin-bottom: 2.75rem;
    }
  }
`;

const SubTitle = styled.h4`
  margin: 0.8rem 0;
  display: inline-flex;
  align-items: center;
  @media screen and (max-width: 720px) {
    margin: 1.75rem 0;
  }
  svg {
    margin-right: 0.8rem;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > *:last-child {
    margin-right: 1rem;
    margin-top: 0.5rem;
    font-size: 1.525rem;
    @media screen and (max-width: 720px) {
      font-size: 1.3rem;
      margin-top: 1.2rem;
    }
  }
`;

const Image = styled(Img)`
  height: 45rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-light);
  @media screen and (max-width: 720px) {
    height: 25rem;
    margin: 0 -1rem 1rem;
  }
`;

const Content = styled.div`
  p {
    line-height: 2;
    margin-bottom: 3rem;
    text-align: justify;
    @media screen and (max-width: 720px) {
      padding: 0 0.5rem;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }

  img {
    margin: 2rem 0 0.5rem;
    @media screen and (max-width: 720px) {
      max-width: 70vw;
    }
  }
`;
