import React from 'react';
import styled from 'styled-components';
import Img from './Image.js';
import Link from './Link';
import { FaGlobe, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

export default function LearningSpaceCard({
  props: { image, name, approach, city, state, description, website, phone, email, slug },
}) {
  return (
    <LearningSpaceCardContainer>
      <Link to={`/alternative-learning-spaces/${slug}`} direction="right">
        <Image fluid={image && image.localFiles[0].childImageSharp.fluid} />
        <Title>{name}</Title>
      </Link>
      <Body>
        <Subtitle>{approach}</Subtitle>
        <Subtitle>{`${city}, ${state}`}</Subtitle>
        <p>{description && description.substring(0, 150)}</p>
        <ContactInfo to={website}>
          <FaGlobe /> {website ? String(website.split(/https?:\/\//g)[1]).substring(0, 30) : 'NA'}
        </ContactInfo>
        <ContactInfo to={`tel:${phone}`}>
          <FaPhone /> {phone || 'NA'}
        </ContactInfo>
        <ContactInfo to={`mailto:${email}`}>
          <FaEnvelope />
          {email ? String(email.substring(0, 30)) : 'NA'}
        </ContactInfo>
      </Body>
      <Footer to={`/alternative-learning-spaces/${slug}`} direction="right">
        <span>
          Read More <FiPlus />
        </span>
      </Footer>
    </LearningSpaceCardContainer>
  );
}

const LearningSpaceCardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 5px 14px 2px;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const Image = styled(Img)`
  height: 19rem;
  border-radius: 0.5rem 0.5rem 0 0;
`;
const Title = styled.h3`
  background: var(--secondary-color);
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-size: 1.8rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 2rem 0.5rem;
  flex: 1;
  p {
    font-size: 1.4rem;
    margin: 1rem 0;
  }
`;

const Subtitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
`;

const ContactInfo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 400;
  color: #7b9985;
  svg {
    margin-right: 0.7rem;
  }
`;

const Footer = styled(Link)`
  padding: 1.4rem 2.5rem;
  border-top: 1px solid #e7e7e7;
  color: var(--primary-color);
  margin-top: 0.5rem;
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
