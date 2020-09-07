import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FiMail } from 'react-icons/fi';
import { RiCopyrightLine, RiHeart2Line } from 'react-icons/ri';
import { Container } from '../styles/baseStyles.js';
import Link from './Link';

export default function Footer() {
  const { allMenuJson } = useStaticQuery(graphql`
    {
      allMenuJson {
        edges {
          node {
            title
            link
          }
        }
      }
    }
  `);
  return (
    <FooterContainer>
      <Container>
        <Row>
          <p>
            <FiMail /> &nbsp; contact@alternativeeducation.in
          </p>
          <Menu>
            {allMenuJson.edges.map(({ node }) => (
              <MenuItem to={node.link} key={node.link} direction="right">
                {node.title}
              </MenuItem>
            ))}
          </Menu>
        </Row>
        {/* <Row>
          <p>
            Made With &nbsp; <RiHeart2Line /> &nbsp; by &nbsp; <a href="https://siliconchild.in">siliconChild</a>
          </p>
          <p>
            <RiCopyrightLine />
            &nbsp; Alternative Education India, {new Date().getFullYear()}, All Rights Reserved
          </p>
        </Row> */}
      </Container>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background: #f6f9fd;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  z-index: 1;
  @media screen and (max-width: 720px) {
    padding: 3rem 2rem 4rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }

  /* &:last-child {
    p {
      @media screen and (max-width: 720px) {
        display: block;
        margin: 1.75rem 0 0;
        text-align: center;
      }
    }
  } */

  p {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    @media screen and (max-width: 720px) {
      margin: 1.5rem 0;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
  a:not(:last-child) {
    margin-right: 1.5rem;
  }
  a {
    @media screen and (max-width: 720px) {
      margin: 1.15rem 0;
    }
  }
`;

const MenuItem = styled(Link)``;
