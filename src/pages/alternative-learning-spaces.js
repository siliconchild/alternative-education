import React, { useState, useEffect, useRef, useCallback } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Container } from '../styles/baseStyles.js';
import LightSVG from '../images/idea.svg';
import LearningSpaceCard from '../components/LearningSpaceCard.js';
import Fuse from 'fuse.js';
import useWindowSize from '../hooks/useWindowSize';
import { DebounceInput } from 'react-debounce-input';
import AddNewButton from '../components/AddNewButton';

export const query = graphql`
  {
    allAirtableLearningSpaces(
      filter: { data: { publish: { eq: true } } }
      sort: { fields: data___name, order: [ASC] }
    ) {
      edges {
        node {
          recordId
          data {
            name
            approach
            city
            state
            description
            website
            phone
            email
            address
            image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default function LearningSpacesPage({ data: { allAirtableLearningSpaces } }) {
  const next = useRef();
  const [filteredList, setFilteredList] = useState(allAirtableLearningSpaces.edges);
  const [currentList, setCurrentList] = useState([]);
  const windowSize = useWindowSize();
  const initCardCount = windowSize.width < 720 ? 3 : 8;

  useEffect(() => {
    setCurrentList(filteredList.slice(0, initCardCount));
  }, [filteredList]);

  const loadMore = useCallback(() => {
    const hasMore = currentList.length < filteredList.length;
    if (!hasMore) return;
    const nextEdges = hasMore ? filteredList.slice(currentList.length, currentList.length + initCardCount * 2) : [];
    setCurrentList([...currentList, ...nextEdges]);
  }, [filteredList, currentList]);

  useEffect(() => {
    const target = next.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      {
        threshold: 0,
        rootMargin: '400px',
      }
    );
    if (target) observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [loadMore]);

  const searchFilter = ({ target: { value } }) => {
    const query = value.toLowerCase();
    if (query === '') {
      setFilteredList(allAirtableLearningSpaces.edges);
      return;
    }

    // Fuse JS Search Options
    const fuse = new Fuse(allAirtableLearningSpaces.edges, {
      keys: ['node.data.name', 'node.data.approach', 'node.data.city', 'node.data.state'],
      threshold: 0.3,
    });

    let filtered = fuse.search(query);
    setFilteredList(filtered);
  };

  return (
    <>
      <Container wide>
        <Header>
          <img height="150" src={LightSVG} alt="section header logo" />
          <Content>
            <p>
              We have prepared this list as a starting point in your search for alternatives. People have different
              values and priorities and everyone views education differently. So we intend to keep this list as open as
              possible. Please use your best judgement while going through the list. To stay unbiased we dont accept
              money from the institutions listed here.
            </p>
            <Search
              type="text"
              minLength={2}
              debounceTimeout={50}
              placeholder="&#128270; Search for Name, Methodology, City or State"
              onChange={searchFilter}
            />
          </Content>
        </Header>
        <LearningSpacesPreview>
          {currentList.map(el => {
            let node;
            el.item ? (node = el.item.node) : (node = el.node); // Fuse JS Returns a Nested Object as Search Result. This Prevents the need for an additional Map Method on The Result.
            return <LearningSpaceCard key={el.recordId} props={{ ...node.data, slug: node.fields.slug }} />;
          })}
        </LearningSpacesPreview>
        <div ref={next}></div>
      </Container>
      <AddNewButton link="https://airtable.com/shrrRFKNBmz9wDd4W">Add Learning Space</AddNewButton>
    </>
  );
}

const Header = styled.div`
  margin: 4rem 0 3.5rem;
  display: flex;
  img {
    margin-right: 3rem;
    @media screen and (max-width: 720px) {
      display: none;
    }
  }
  p {
    text-align: center;
    margin: 1rem 0 3rem;
    @media screen and (max-width: 720px) {
      display: none;
      text-align: justify;
      margin: 0 0 2.5rem;
      font-size: 1.5rem;
      padding: 0 0.75rem;
    }
  }
  @media screen and (max-width: 720px) {
    flex-direction: column;
    margin: 2rem 0 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Search = styled(DebounceInput)`
  width: 50%;
  padding: 1rem 2.5rem;
  border: 0.5px solid #bbb;
  border-radius: 0.75rem;
  font-size: 1.6rem;
  outline: none;
  box-shadow: 0 0 5px var(--primary-color);
  border: 1px solid var(--primary-color);
  @media screen and (max-width: 720px) {
    width: 100%;
    font-size: 1.4rem;
  }

  &:focus {
    box-shadow: 0 0 15px var(--primary-color);
  }
`;

const LearningSpacesPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 10rem;
  & > * {
    flex: 0 0 calc(25% - 2rem);
    margin: 1.5rem 0;
    @media screen and (max-width: 720px) {
      flex: 0 0 100%;
    }
    &:not(:nth-child(4)) {
      margin-right: 2rem;
      @media screen and (max-width: 720px) {
        margin-right: 0;
      }
    }
  }
`;
