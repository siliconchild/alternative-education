import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import isAbsoluteUrl from 'is-absolute-url';

const Link = ({ to, ...props }) => {
  if (to && to !== '' && isAbsoluteUrl(to)) {
    return (
      <a target="_blank" rel="noopener" href={to} {...props}>
        {props.children}
      </a>
    );
  } else {
    return (
      <AniLink
        cover
        bg="linear-gradient(45deg, var(--primary-color), var(--primary-color-light))"
        duration={1.4}
        to={to}
        {...props}
      />
    );
  }
};

export default Link;
