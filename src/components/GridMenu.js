import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './Link';

export default function GridMenu() {
  const { allMenuJson } = useStaticQuery(graphql`
    {
      allMenuJson {
        edges {
          node {
            title
            link
            desc
            image {
              publicURL
            }
          }
        }
      }
    }
  `);

  return (
    <GridMenuContainer>
      {allMenuJson.edges.map(({ node }) => (
        <GridMenuItem direction="right" key={node.link} to={node.link}>
          <Icon src={node.image.publicURL} />
          <Content>
            <Title>{node.title}</Title>
            <p>{node.desc}</p>
          </Content>
        </GridMenuItem>
      ))}
    </GridMenuContainer>
  );
}

/* Styles */

const GridMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const GridMenuItem = styled(Link)`
  color: var(--text-dark);
  display: flex;
  align-items: center;
  flex: 1 0 calc(50% - 3rem);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  padding: 2.5rem;
  transition: all 0.2s;

  @media screen and (max-width: 720px) {
    flex: 0 0 100%;
    padding: 2.5rem 1rem 2.5rem 1.5rem;
  }

  &:nth-child(odd) {
    margin: 1.5rem 1.5rem 1.5rem 0;
    @media screen and (max-width: 720px) {
      margin: 1.5rem 0;
    }
  }

  &:nth-child(even) {
    margin: 1.5rem 0 1.5rem 1.5rem;
    @media screen and (max-width: 720px) {
      margin: 1.5rem 0;
    }
  }

  &:hover {
    background-color: #dcedc8;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Icon = styled.img`
  height: 48px;
  width: 48px;
  object-fit: contain;
  margin-right: 2rem;
`;
const Content = styled.div``;

const Title = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;
