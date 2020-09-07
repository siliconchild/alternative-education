import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { Button } from '../styles/baseStyles.js';
import LocationSVG from '../images/location.svg';
import Img from 'gatsby-image';
import Link from './Link';

export default function EventCard({ props: { start_date, name, location, banner, description, link } }) {
  const { file: placeholderImage } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "placeholder-gallery.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            src
          }
        }
      }
    }
  `);

  const cardImage = banner ? banner.localFiles[0].childImageSharp.fluid : placeholderImage.childImageSharp.fluid;
  return (
    <EventCardContainer>
      <SideLine />
      <Head>
        <Date>{start_date}</Date>
        <Title>{name}</Title>
        <Location>
          <LocationIcon src={LocationSVG} />
          <span>{location}</span>
        </Location>
      </Head>
      <Image fluid={cardImage} />
      <Body>
        <Description>{description}</Description>
        <Link to={link}>
          <Button secondary>Know More</Button>
        </Link>
      </Body>
    </EventCardContainer>
  );
}

/* Styles */

const EventCardContainer = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 6rem;
  }

  & > *:not(:last-child) {
    margin-right: 3rem;
  }

  @media screen and (max-width: 720px) {
    flex-wrap: wrap;
    &:not(:last-child) {
      padding-bottom: 2.5rem;
      margin-bottom: 3.5rem;
      border-bottom: 1px solid #e7e7e7;
    }
    & > *:not(:last-child) {
      margin-right: 1.25rem;
    }
  }
`;

const SideLine = styled.div`
  height: 14rem;
  border-left: 1.5px solid var(--primary-color);
  width: 0.5rem;
  position: relative;

  @media screen and (max-width: 1024px) {
    height: 8rem;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(25% - 2.5rem);
  @media screen and (max-width: 1024px) {
    flex: 0 0 calc(55% - 2.5rem);
  }
`;

const Date = styled.h4`
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  color: var(--text-dark);
`;

const Title = styled.h3`
  font-size: 1.9rem;
  margin: 1.5rem 0;
  letter-spacing: 0.2px;
  @media screen and (max-width: 1024px) {
    margin: 1.5rem 0 1rem;
  }
`;

const Location = styled.div`
  margin-top: auto;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: flex-end;
  span {
    display: block;
    margin-bottom: 0.15rem;
  }
`;

const LocationIcon = styled.img`
  height: 28px;
  margin-right: 0.5rem;
  @media screen and (max-width: 1024px) {
    height: 26px;
  }
`;

const Image = styled(Img)`
  height: 13rem;
  object-fit: cover;
  flex: 0 0 calc(20% - 2.5rem);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-light);

  @media screen and (max-width: 1024px) {
    flex: 0 0 calc(45% - 3.25rem);
    height: 12rem;
    margin: 0 0 0 auto;
  }
`;

const Body = styled.div`
  flex: 0 0 calc(50% - 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 1rem;
  margin-left: 1rem;
  @media screen and (max-width: 1024px) {
    flex: 0 0 100%;
    padding: 1rem 0;
    margin-left: 0;
  }
`;

const Description = styled.p`
  text-align: justify;
  margin-bottom: 1rem;
  @media screen and (max-width: 1024px) {
    margin: 1.5rem 1rem 2rem 0.5rem;
  }
`;
