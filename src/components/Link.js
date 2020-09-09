import React from 'react';
import { Link } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

const LinkWrapper = ({ to, ...props }) => {
  if (to && to !== '' && isAbsoluteUrl(to)) {
    return (
      <a target="_blank" rel="noopener" href={to} {...props}>
        {props.children}
      </a>
    );
  } else if (to && to !== '') {
    return (
      <Link to={to} {...props}>
        {props.children}
      </Link>
    );
  } else {
    return null;
  }
};

export default LinkWrapper;
