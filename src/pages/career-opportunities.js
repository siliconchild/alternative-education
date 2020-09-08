import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../styles/baseStyles';
import { graphql } from 'gatsby';
import LocationSVG from '../images/location.svg';
import sanitizeHtml from 'sanitize-html';
import { RiTimerLine, RiPhoneLine, RiLinksLine, RiMailOpenLine } from 'react-icons/ri';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import useWindowSize from '../hooks/useWindowSize';
import Link from '../components/Link';
import AddNewButton from '../components/AddNewButton';
import { Button } from '../styles/baseStyles';

export const careersQuery = graphql`
  {
    careers: allAirtableCareers(filter: { data: { publish: { eq: true } } }) {
      edges {
        node {
          recordId
          data {
            title
            type
            website
            published(formatString: "DD MMMM YY")
            phone
            organisation
            location
            email
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  }
`;

export default function CareerOpportunities({ data: { careers } }) {
  const [whichDescriptionShown, setWhichDescriptionShown] = useState(0);
  const [isDescriptionShown, setIsDescriptionShown] = useState(true);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 720;

  useEffect(() => {
    if (isMobile) setIsDescriptionShown(false);
  }, [isMobile]);

  return (
    <>
      <Container wide>
        <ListingCardContainer>
          {careers.edges.map(({ node }, index) => {
            const cleanHTML = sanitizeHtml(node.data.description.childMarkdownRemark.html);
            return (
              <div key={node.recordId}>
                <ListingCard
                  active={whichDescriptionShown === index}
                  onClick={() => {
                    if (!isMobile) {
                      setWhichDescriptionShown(index);
                    }
                  }}>
                  {/* <Published>{node.data.published}</Published> */}
                  <Main>
                    <h5>{node.data.organisation}</h5>
                    <Title>{node.data.title}</Title>
                    <Location>
                      <LocationIcon src={LocationSVG} /> {node.data.location}
                    </Location>
                    <Type type={node.data.type}>{node.data.type}</Type>
                  </Main>
                  <Secondary>
                    <InfoItem to={node.data.website}>
                      <RiLinksLine /> {node.data.website}
                    </InfoItem>
                    <InfoItem to={`tel:${node.data.phone}`}>
                      <RiPhoneLine />
                      {node.data.phone}
                    </InfoItem>
                    <InfoItem to={`mailto:${node.data.email}`}>
                      <RiMailOpenLine /> {node.data.email}
                    </InfoItem>
                  </Secondary>
                  {isDescriptionShown && whichDescriptionShown === index ? (
                    <MoreInfo
                      onClick={() => {
                        setIsDescriptionShown(false);
                      }}>
                      <MdExpandLess />
                      <h5>Less Information</h5>
                    </MoreInfo>
                  ) : (
                    <MoreInfo
                      onClick={() => {
                        setWhichDescriptionShown(index);
                        setIsDescriptionShown(true);
                      }}>
                      <MdExpandMore />
                      <h5>More Information</h5>
                    </MoreInfo>
                  )}
                </ListingCard>
                <LisingDescriptionContainer show={whichDescriptionShown === index && isDescriptionShown}>
                  <Button alert onClick={() => setIsDescriptionShown(false)}>
                    Close
                  </Button>
                  <LisingDescription
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML,
                    }}
                  />
                </LisingDescriptionContainer>
              </div>
            );
          })}
        </ListingCardContainer>
      </Container>
      <AddNewButton link="https://airtable.com/shrvH8t45lA1amxmQ">Add Listing</AddNewButton>
    </>
  );
}

const ListingCardContainer = styled.div`
  width: calc(50% - 2rem);
  margin: 5rem 0;
  input {
    margin-bottom: 2.5rem;
  }
  @media screen and (max-width: 720px) {
    width: 100%;
    margin: 2rem 0 5rem;
  }
`;

const ListingCard = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5rem 1rem 3.5rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 5px 25px 2px;
  margin-bottom: 2rem;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 3rem 3rem 0.5rem;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.4rem;
    background: #fff;
    border-radius: 0 0 4rem 4rem;
    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  ${props =>
    props.active &&
    css`
      padding: 3em 1rem 4rem;
      &::after {
        background: var(--primary-color);
      }
    `}
`;

const Main = styled.div`
  margin-left: 3.25rem;
  @media screen and (max-width: 720px) {
    margin-left: 0;
  }
`;

const Secondary = styled.div`
  margin: 2.5rem 3rem 0 auto;
  @media screen and (max-width: 720px) {
    margin: 2.5rem 0 0;
    display: flex;
    flex-direction: column;
  }
`;

const MoreInfo = styled.div`
  @media screen and (min-width: 1024px) {
    display: none;
  }
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e7e7e7;
  svg {
    margin-right: 0.75rem;
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h3`
  margin: 1.5rem 0 2rem;
  font-size: 2.2rem;
`;

const Location = styled.h5`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
`;

const LocationIcon = styled.img`
  height: 28px;
  margin-right: 0.5rem;
  @media screen and (max-width: 1024px) {
    height: 26px;
  }
`;

const Type = styled.h5`
  color: #fff;
  background-color: var(--primary-color);
  display: inline-block;
  padding: 0.7rem 1.4rem;
  border-radius: 0.75rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  ${props => props.type === 'Internship' && `background-color: #570081`}
  ${props => props.type === 'Part Time' && `background-color: #FF7A4E;`}
`;

const InfoItem = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--text-light);
  svg {
    margin-right: 1rem;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const LisingDescriptionContainer = styled.div`
  display: none;
  ${props =>
    props.show &&
    css`
      display: block;
      padding: 1rem 4rem 5rem 6rem;
      position: fixed;
      width: 48%;
      right: 2%;
      top: 12rem;
      overflow-y: scroll;
      height: 85vh;
      @media screen and (max-width: 720px) {
        position: fixed;
        background: #fff;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        z-index: 3;
        padding: 3rem 4rem;
        margin-bottom: 2rem;
      }
    `}
  button {
    display: none;
    @media screen and (max-width: 720px) {
      display: flex;
      position: fixed;
      right: 4rem;
    }
  }
`;

const LisingDescription = styled.div`
  p {
    margin: 1rem 0 3rem;
    text-align: justify;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 4rem;
  }
  li {
    margin: 1.5rem 0;
    padding: 0 1.5rem;
  }
  @media screen and (max-width: 720px) {
    margin-top: 6rem;
  }
`;
