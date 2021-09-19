import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Container } from '../styles/baseStyles.js';
import Img from '../components/Image';
import { RiPhoneLine, RiLinksLine, RiMailOpenLine } from 'react-icons/ri';
import { FaMapMarkerAlt, FaPenNib } from 'react-icons/fa';
import Link from '../components/Link.js';
import AddNewButton from '../components/AddNewButton.js';

export const learningSpaceQuery = graphql`
  query($slug: String!) {
    learningSpace: airtableLearningSpaces(fields: { slug: { eq: $slug } }) {
      data {
        image {
          localFiles {
            childImageSharp {
              fluid(maxWidth: 1400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        name
        approach
        city
        state
        address
        description
        website
        phone
        email
        articles {
          data {
            title
            author
            link
          }
        }
      }
    }
  }
`;

export default function learningSpace({
  data: {
    learningSpace: {
      data: { image, name, approach, city, state, address, description, website, phone, email, articles },
    },
  },
}) {
  return (
    <>
      <Container>
        <LearningSpaceContainer>
          <Gallery>
            {image?.localFiles.map(image => (
              <Image fluid={image?.childImageSharp?.fluid} />
            ))}
          </Gallery>
          <Location>
            <FaMapMarkerAlt />
            {`${city}, ${state}`}
          </Location>
          {/* <Address>
            <FaAddressCard /> {address}
          </Address> */}
          <Head>
            <Title>{name}</Title>
            <Links>
              {website && (
                <Link to={website}>
                  <RiLinksLine />
                  {website ? String(website.split(/https?:\/\//g)[1]).substring(0, 30) : 'NA'}
                </Link>
              )}
              {phone && (
                <Link to={`tel:${phone}`}>
                  <RiPhoneLine /> {phone}
                </Link>
              )}
              {email && (
                <Link to={`mailto:${email}`}>
                  <RiMailOpenLine />
                  {email}
                </Link>
              )}
            </Links>
            <Approach>{approach}</Approach>
          </Head>
          {articles && (
            <Articles>
              <h4>Community Articles</h4>
              {articles.map(article => (
                <Article>
                  <FaPenNib />
                  <Link to={article.data.link}>{`@${article.data.author} - ${article.data.title}`}</Link>
                </Article>
              ))}
            </Articles>
          )}
          <DescriptionTitle>Description</DescriptionTitle>
          <Description>{description}</Description>
        </LearningSpaceContainer>
      </Container>
      <AddNewButton link="https://airtable.com/shrrRFKNBmz9wDd4W">Add Learning Space</AddNewButton>
    </>
  );
}

const LearningSpaceContainer = styled.div`
  margin: 4rem 0;
  position: relative;
  @media screen and (max-width: 720px) {
    margin: 1rem 0 3rem;
  }
`;

const Gallery = styled.div`
  display: flex;
  overflow-x: auto;
  & > * {
    flex: 1 0 calc(50% - 0.75rem);
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Image = styled(Img)`
  height: 40rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-light);
  @media screen and (max-width: 720px) {
    height: 25rem;
    margin: 0 -1rem;
  }
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 2.5rem 0 0.5rem;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
  & > * {
    margin: 0 0 2rem;
    @media screen and (max-width: 720px) {
      margin: 0;
    }
  }
`;

const Title = styled.h1`
  flex: 0 0 30%;
  @media screen and (max-width: 720px) {
    order: 1;
  }
`;
const Approach = styled.h4`
  flex: 0 0 100%;
  margin: 1rem 0;
  @media screen and (max-width: 720px) {
    order: 2;
    margin: 1.25rem 0;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 2rem 0 3rem;
    order: 3;
  }
  a {
    margin-right: 2rem;
    display: flex;
    align-items: center;
    color: #58c176;
    @media screen and (max-width: 720px) {
      margin: 0.5rem 0;
    }
    svg {
      fill: #58c176;
      margin-right: 0.7rem;
      width: 42px;
      height: 42px;
      background: #d4fcee;
      border-radius: 50%;
      padding: 0.7rem;
      @media screen and (max-width: 720px) {
        background: none;
        padding: 0;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const DescriptionTitle = styled.h4`
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

const Description = styled.p`
  margin: 2.5rem 0.25rem;
  line-height: 2;
  text-align: justify;
  @media screen and (max-width: 720px) {
    font-size: 1.6rem;
    line-height: 2.2;
  }
`;

const Location = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.7rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  svg {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
    fill: #ff5d5d;
  }
`;
// const Address = styled(Location)``;

const Articles = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Article = styled.div`
  box-shadow: var(--shadow-light);
  padding: 0.7rem;
  background: #f5f9fd;
  display: flex;
  align-items: center;
  margin: 0 2rem;
  border-radius: 0.25rem;
  color: #f7cf9e;
  @media screen and (max-width: 720px) {
    margin: 2rem 2rem 0 0;
    padding: 1rem 0 1rem 0.5rem;
    width: 100%;
  }
  svg {
    margin-right: 1rem;
  }
`;
