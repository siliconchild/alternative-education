import React from 'react';
import styled from 'styled-components';
import { BiMessageSquareAdd } from 'react-icons/bi';
import Link from './Link';

export default function AddNewButton({ children, link }) {
  return (
    <AddNewButtonContainer to={link}>
      <BiMessageSquareAdd />
      <span>{children}</span>
    </AddNewButtonContainer>
  );
}

const AddNewButtonContainer = styled(Link)`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: #fff;
  position: fixed;
  padding: 0.7rem 2.1rem;
  border-radius: 2rem;
  right: 6rem;
  bottom: 4rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  z-index: 2;
  svg {
    margin-right: 0.7rem;
  }
  &:hover {
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-5px);
  }
  @media screen and (max-width: 720px) {
    right: 1.5rem;
    bottom: 1.5rem;
    padding: 1.4rem;
    border-radius: 50%;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
    svg {
      height: 32px;
      width: 32px;
      margin-right: 0;
    }
    span {
      display: none;
    }
  }
`;
