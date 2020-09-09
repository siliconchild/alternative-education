import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Link from './Link';
import useHasMounted from '../hooks/useHasMounted';

export default function Navbar() {
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
  let isMounted = useHasMounted();
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  return (
    <Nav>
      <NavbarContainer>
        <Logo direction="left" to="/">
          Alt<span>Education</span>
        </Logo>
        {/* This fixes react rehydration wrongly placing MenuToggle at the bottom of the screen. */}
        {isMounted && (
          <MenuToggle onClick={() => setIsHamburgerMenuOpen(prevState => !prevState)} open={isHamburgerMenuOpen}>
            <div></div>
            <div></div>
            <div></div>
          </MenuToggle>
        )}
        <Menu show={isHamburgerMenuOpen}>
          {allMenuJson.edges.map(({ node }) => (
            <MenuItem key={node.link} to={node.link} direction="right">
              {node.title}
            </MenuItem>
          ))}
        </Menu>
      </NavbarContainer>
    </Nav>
  );
}

/* Styles */

const Nav = styled.nav`
  box-shadow: var(--shadow-light);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 2;
  overflow: hidden;

  @media screen and (max-width: 720px) {
    box-shadow: var(--shadow-mid);
  }

  & + * {
    margin-top: 6rem !important;
    @media screen and (max-width: 720px) {
      margin-top: 6rem !important;
    }
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.25rem 0;
  max-width: var(--container-width);
  width: 85%;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    padding: 1.5rem 0 1.25rem;
  }
`;
const Logo = styled(Link)`
  cursor: pointer;
  color: var(--primary-color);
  text-transform: uppercase;
  font-size: 2.5rem;
  span {
    font-weight: 400;
  }
`;

const MenuToggle = styled.div`
  height: 2.4rem;
  width: 3.2rem;
  display: none;
  transition: all 0.2s;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: block;
    height: 0.3rem;
    width: 100%;
    background: var(--text-light);
    border-radius: 25px;
  }

  ${props =>
    props.open &&
    css`
      transform: rotate(45deg);
      div:nth-child(1) {
        transform: rotate(90deg) translateX(1.1rem);
        transform-origin: 50%;
      }

      div:nth-child(2) {
        display: none;
      }

      div:nth-child(3) {
        transform: translateY(-1.1rem);
        transform-origin: 50%;
      }
    `}

  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    display: none;
    flex-direction: column;
    flex: 0 0 100%;
    border-top: 1px solid #e7e7e7;
    padding-top: 1.5rem;
    margin: 1.5rem 0 0;
    align-items: flex-start;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.15s ease-out;
    ${props =>
      props.show &&
      css`
        display: flex;
        max-height: 70rem;
        margin: 1.5rem 0 1rem;
        transition: max-height 0.25s ease-in;
      `}
  }
`;
const MenuItem = styled(Link)`
  display: block;
  font-size: 1.55rem;
  color: var(--text-light);

  &:not(:last-child) {
    margin-right: 2rem;
  }

  &:hover {
    color: var(--primary-color);
  }

  @media screen and (max-width: 1024px) {
    margin: 1rem 0;
    width: 100%;
    margin-right: 0;
    margin-left: 1.5rem;
    font-size: 1.65rem;
  }
`;
