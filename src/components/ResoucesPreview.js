import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../styles/baseStyles';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './Link';

export default function ResoucesPreview({ column }) {
  const { allResourcesJson } = useStaticQuery(graphql`
    {
      allResourcesJson {
        edges {
          node {
            name
            link
            id
            img {
              publicURL
            }
          }
        }
      }
    }
  `);

  return (
    <ResoucesPreviewContainer>
      <Title>Resources</Title>
      <ResoucesGrid>
        {allResourcesJson.edges.map(({ node }) => (
          <ResourceItem key={node.id} direction="right" to={node.link} column={column}>
            <Head>
              <h2>{node.name}</h2>
              <Button secondary invertMobile>
                View
              </Button>
            </Head>
            <img src={node.img.publicURL} />
          </ResourceItem>
        ))}
      </ResoucesGrid>
    </ResoucesPreviewContainer>
  );
}

const ResoucesPreviewContainer = styled.div`
  /* background: #f5f9fd; */
`;

const Title = styled.h2`
  font-size: 2.7rem;
  margin-bottom: 5rem;
`;

const ResoucesGrid = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

const ResourceItem = styled(Link)`
  flex: 0 0 calc(33.33% - 9rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 1.5rem;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 5px 25px 2px;
  transition: all 0.3s;

  ${props =>
    props.column &&
    css`
      flex: 0 0 31%;
      flex-direction: row;
      justify-content: space-between;
      padding: 3rem 3rem 3rem 4rem;
      ${Head} {
        align-items: flex-start;
      }
    `}

  @media screen and (max-width: 720px) {
    flex: 1;
    margin: 0;
    flex-direction: row;
    justify-content: space-between;
    padding: 2.5rem 2rem;
  }

  &:not(:last-child) {
    margin-right: 6rem;
    ${props => props.column && `margin-right: 4rem;`}
    @media screen and (max-width: 720px) {
      margin-right: 0;
      margin-bottom: 3.5rem;
    }
  }
  h2 {
    margin: 1rem 2.5rem 2.5rem;
    text-align: center;
    ${props =>
      props.column &&
      css`
        margin: 0 0 3rem 0;
        font-size: 2.2rem;
        text-align: left;
      `}
    color: var(--text-dark-mid);
    @media screen and (max-width: 720px) {
      font-size: 2.15rem;
      text-align: left;
      margin: 1.5rem 0 3rem;
    }
  }
  img {
    height: 15rem;
    margin: 4rem 0 0;
    ${props =>
      props.column &&
      css`
        margin: 0 0 0 1rem;
        height: 14.5rem;
      `}
    @media screen and (max-width: 720px) {
      margin-right: 0;
      height: 14rem;
      margin: 0;
    }
  }
  &:hover {
    transform: translateY(-0.7rem);
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 720px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
