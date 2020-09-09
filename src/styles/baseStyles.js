import styled, { css } from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

export const Container = styled.div`
    max-width: var(--container-width);
    margin 0 auto;
    width: 85%;
    ${props => props.wide && `max-width: var(--container-width-wide)`}
    ${props => props.narrow && `max-width: var(--container-width-narrow)`}
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  font-size: 1.6rem;
  border-radius: 2.5rem;
  padding: 0.7rem 2rem;
  box-shadow: var(--shadow-button);
  transition: all .2s;
    
  ${props =>
    props.primary &&
    css`
      background: var(--primary-color);
      color: #fff;
      border: 1px solid transparent;
      padding: 0.8rem 1.5rem;

      &:hover {
        background: #fff;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
      }
    `}

  ${props =>
    props.secondary &&
    css`
      background: #fff;
      border: 0.5px solid var(--primary-color-light);
      color: var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: #fff;
        border: 1px solid transparent;
      }

      @media screen and (max-width: 720px) {
        ${props =>
          props.invertMobile &&
          css`
            background: var(--primary-color);
            color: #fff;
            border: 1px solid transparent;
          `}
      }
    `}

    ${props =>
      props.alert &&
      css`
        background: #f73130;
        border: 0.5px solid #f73130;
        color: #fff;
      `}

  ${props =>
    props.gradient &&
    css`
      background: linear-gradient(135deg, #00c7c5 0%, #28b463 100%);
      border: 1px solid transparent;
      color: #fff;
      padding: 1rem 2rem;
      &:hover {
        background: #fff;
        border: 1px solid var(--primary-color);
        color: #00c7c5;
      }
    `}

  ${props =>
    props.dark &&
    css`
      border: 1px solid var(--text-light);
      color: var(--text-dark);
    `}

`;

export const Search = styled(DebounceInput)`
  width: 100%;
  padding: 1rem 2.5rem;
  border: 0.5px solid #bbb;
  border-radius: 0.75rem;
  font-size: 1.6rem;
  outline: none;
  box-shadow: 0 0 5px var(--primary-color);
  border: 1px solid var(--primary-color);
  @media screen and (max-width: 720px) {
    width: 100%;
    box-shadow: none;
  }

  &:focus {
    box-shadow: 0 0 15px var(--primary-color);
    @media screen and (max-width: 720px) {
      box-shadow: 0 0 2px var(--primary-color-transparent);
    }
  }
`;

export const SpinnerOverlayContainer = styled.div`
  height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.height &&
    `
      height: ${props.height};
  `}
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
