import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Container } from '../../styles/baseStyles';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PinSVG from '../../images/pin.svg';
import { BiLinkExternal } from 'react-icons/bi';
import Link from '../../components/Link';
import AddNewButton from '../../components/AddNewButton';

export const localCommunitiesQuery = graphql`
  {
    localCommunities: allAirtableLocalCommunities(filter: { data: { publish: { eq: true } } }) {
      edges {
        node {
          recordId
          data {
            place
            name
            state
            website
            latitude
            longitude
          }
        }
      }
    }
  }
`;

export default function LocalCommunityNetworks({ data: { localCommunities } }) {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(({ coords: { accuracy, latitude, longitude } }) => {
  //     let zoom = viewport.zoom;

  //     if (accuracy <= 10000) zoom = 9;
  //     else if (accuracy <= 50000) zoom = 8;
  //     else if (accuracy <= 100000) zoom = 7;
  //     else if (accuracy <= 175000) zoom = 6;

  //     setViewport({ ...viewport, latitude: latitude, longitude: longitude, zoom: zoom });
  //   });
  // });

  return (
    <LocalCommunitiesContainer>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/alternativeeducation/ckerbxbvw6nyc19qq0ruph1pp"
        mapboxApiAccessToken={process.env.GATSBY_MAPBOX_API_TOKEN}
        onViewportChange={viewport => setViewport(viewport)}>
        {localCommunities.edges.map(({ node }) => {
          return (
            <Marker key={node.recordId} latitude={node.data.latitude} longitude={node.data.longitude}>
              <MarkerAction onClick={() => setSelectedMarker(node.data)}>
                <PinIcon src={PinSVG} />
                <MarkerLabel>{node.data.name}</MarkerLabel>
              </MarkerAction>
            </Marker>
          );
        })}
        {selectedMarker && (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false}>
            <PopupBody>
              <h4>{selectedMarker.name}</h4>
              <Link to={selectedMarker.website}>
                <BiLinkExternal />
                {selectedMarker.website}
              </Link>
            </PopupBody>
          </Popup>
        )}
      </ReactMapGL>
      <AddNewButton link="https://airtable.com/shrbltvCXG4RGQxeh">Add Community</AddNewButton>
    </LocalCommunitiesContainer>
  );
}

const LocalCommunitiesContainer = styled.div`
  margin: 0 !important;
`;

const MarkerAction = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const MarkerLabel = styled.div`
  background: #555;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
`;

const PinIcon = styled.img`
  height: 32px;
  width: 32px;
`;

const PopupBody = styled.div`
  padding: 0.25rem 0.5rem 0;
  h4 {
    margin-bottom: 0.7rem;
  }
  a {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    color: var(--text-dark);
    svg {
      margin-right: 0.5rem;
    }
  }
`;
