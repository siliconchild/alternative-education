import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/baseStyles.js';
import Events from '../components/Events.js';
import AddNewButton from '../components/AddNewButton.js';

export default function EventsPage() {
  return (
    <>
      <Container>
        <EventsContainer>
          <Events />
        </EventsContainer>
      </Container>
      <AddNewButton link="https://airtable.com/shrYSM3oBE3SXFHmK">Add Event</AddNewButton>
    </>
  );
}

const EventsContainer = styled.div`
  margin: 3rem 0 8rem;
  @media screen and (max-width: 720px) {
    margin: 1rem 0 5rem;
  }
`;
