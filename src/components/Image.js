import React from 'react';
import { default as GatsbyImage } from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

export default function Img(props) {
  const { file: placeholderImage } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "placeholder-gallery.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  if (props.fluid || props.fixed) return <GatsbyImage {...props} />;
  else return <GatsbyImage fluid={placeholderImage.childImageSharp.fluid} />;
}
