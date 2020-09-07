import React from 'react';
import styled, { css } from 'styled-components';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from './Link';

export default function BlogCard({ props: { banner, title, content, author, slug, column, mini } }) {
  const { file: placeholderImage } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "placeholder-gallery.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const cardImage = banner.localFiles
    ? banner.localFiles[0].childImageSharp.fluid
    : placeholderImage.childImageSharp.fluid;

  return (
    <BlogCardContainer column={column} mini={mini} to={`/blog/${slug}`} direction="right">
      <Image fluid={cardImage} />
      <Body>
        <Title>{title}</Title>
        <p>
          {!mini
            ? content.childMarkdownRemark.excerpt
            : String(content.childMarkdownRemark.excerpt).substring(0, 52) + '...'}
        </p>
        <AuthorName>
          <BsFillPersonFill /> {author}
        </AuthorName>
      </Body>
    </BlogCardContainer>
  );
}

const BlogCardContainer = styled(Link)`
  ${props =>
    props.column &&
    css`
      display: flex;
      align-items: center;
      @media screen and (max-width: 720px) {
        flex-direction: column;
      }
      ${Image} {
        flex: 0 0 33.33%;
        height: 24rem;
      }
      ${Title} {
        margin: 0;
        @media screen and (max-width: 720px) {
          margin: 1rem 0;
        }
      }
      ${Body} {
        padding: 0 2.5rem;
        @media screen and (max-width: 720px) {
          padding: 0 1rem;
        }
        p {
          margin: 2rem 0;
          text-align: justify;
        }
      }
    `}
  ${props =>
    props.mini &&
    css`
      @media screen and (max-width: 720px) {
        display: none;
      }
      ${Image} {
        height: 10rem;
      }
      ${Title} {
        font-size: 1.4rem;
      }
      ${Body} {
        p {
          margin: 0.5rem 0;
        }
      }
    `}
`;
const Image = styled(Img)`
  height: 22rem;
  object-fit: cover;
  width: 100%;
  box-shadow: var(--shadow-light);
  border-radius: 1rem;
`;

const Body = styled.div`
  padding: 0.5rem 1rem;
  p {
    margin: 2rem 0 2rem;
    text-align: justify;
  }
`;

const Title = styled.h4`
  margin: 2rem 0 0.5rem;
  color: var(--text-dark);
`;

const AuthorName = styled.h5`
  margin-top: 1rem;
  color: var(--text-dark);
  svg {
    margin-right: 0.5rem;
  }
`;
