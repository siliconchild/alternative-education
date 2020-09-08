import React from 'react';
import styled from 'styled-components';
import EventCard from './EventCard.js';
import { useStaticQuery, graphql } from 'gatsby';

export default function Events() {
  const { allAirtableEvents } = useStaticQuery(graphql`
    {
      allAirtableEvents(filter: { data: { publish: { eq: true } } }, sort: { fields: data___start_date, order: DESC }) {
        edges {
          node {
            recordId
            data {
              name
              start_date(formatString: "DD MMMM YY")
              end_date(formatString: "DD MMMM YY")
              location
              link
              banner {
                localFiles {
                  childImageSharp {
                    fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              description
            }
          }
        }
      }
    }
  `);

  return (
    <EventsContainer>
      <Title>Events</Title>
      {allAirtableEvents.edges.map(({ node }) => (
        <EventCard key={node.recordId} props={node.data} />
      ))}
    </EventsContainer>
  );
}

/* Styles */

const EventsContainer = styled.div`
  @media screen and (max-width: 720px) {
    margin-top: 3rem;
  }
`;
const Title = styled.h2`
  font-size: 2.7rem;
  margin-bottom: 5rem;
`;
