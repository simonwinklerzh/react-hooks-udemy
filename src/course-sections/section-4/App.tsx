import React, { useState, FormEvent } from 'react';
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  InputGroup,
  FormControl,
  Alert
 } from 'react-bootstrap';
import { handleErrors } from '../../utilities';

// Properties that we expect to get from the server
export interface INewsListEntryRaw {
  url?: string;
  title?: string;
  story_url?: string;
  story_title?: string;
  author?: string;
  points?: number;
}

// Properties that we need to have for rendering our news list
export interface INewsListEntry {
  url?: string;
  title: string;
  author: string;
  points: number;
}

export const NewsListEntry = ({
  url,
  title,
  author,
  points
}: INewsListEntry) => (
  <li>
    { url
      ? <a href={url}>{title}</a>
      : <span>{title}</span>
    }
    &nbsp;
    <small>Author: <b>{author}</b></small>
    {' '}
    <Badge variant="secondary">Points: {points}</Badge>
  </li>
);


/**
 * Result objects from the server seem to have either the properties:
 * { title: '..', url: '..', ... }
 * or
 * { story_title: '..', story_url: '..', ... }
 *
 * In this function we conditionally pluck these properties and
 * convert them into an object with the shape:
 * {
 *   title: '..',
 *   url: '..',
 *   ...
 * }
 *
 * And also we exclude objects which have neither a 'title' nor a 'story_title'
 */
export const normalizeResults = (
  normalizedResults: INewsListEntry[],
  current: INewsListEntryRaw
): INewsListEntry[] => {
  const normalizedResult: any = {};
  if (current.title) {
    normalizedResult.title = current.title;
    if (current.url) {
      normalizedResult.url = current.url;
    }
  } else if (current.story_title) {
    normalizedResult.title = current.story_title;
    if (current.story_url) {
      normalizedResult.url = current.story_url;
    }
  }
  if (current.author) {
    normalizedResult.author = current.author;
  }
  if (current.points) {
    normalizedResult.points = current.points;
  }
  // We have not found a title.
  // Exclude the current object from the return array.
  if (!normalizedResult.title) {
    return normalizedResults;
  }
  // Here we have an object of the shape we want.
  // Add it to the return array.
  return [...normalizedResults, normalizedResult];
}

// Avoid responding to wrongly ordered responses
let mostRecentQuery: string | null = null;

const getResults = async (
  query: string,
  setQuery: Function,
  setResults: Function,
  setLoading: Function,
  setError: Function
) => {
  if (!query?.trim()) {
    setResults([]);
    setQuery('');
    return;
  }
  const currentQuery = `http://hn.algolia.com/api/v1/search?query=${query}`;
  mostRecentQuery = currentQuery;
  setLoading(true);
  fetch(currentQuery)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseObject => {
      if (currentQuery === mostRecentQuery) {
        setResults(responseObject.hits);
        setLoading(false);
        setError(false);
      }
    })
    .catch((error) => {
      console.error(error);
      if (currentQuery === mostRecentQuery) {
        setLoading(false);
        setResults([]);
        setError(error);
      }
    });
}

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<false | Error>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getResults(query, setQuery, setResults, setLoading, setError);
  };

  return (
    <>
      <Container>
        <h1 className="mt-3 h4">Search on Hacker News</h1>
        <Row>
          <Col sm={6}>
            <form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  autoFocus
                  placeholder="Enter search term"
                  aria-label="Enter search term"
                  aria-describedby="basic-addon2"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    type="submit"
                    disabled={isLoading}>{
                      isLoading ? 'Loading...' : 'Search'
                    }</Button>
                </InputGroup.Append>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <hr />
        { results.length
          ? (
            <>
              <div className="mb-3 text-secondary"><b>Displaying {results.length} results</b></div>
              <ul>
                {results
                  .reduce(normalizeResults, [])
                  .map((result: INewsListEntry, index) => (
                    <NewsListEntry key={index}
                      url={result.url}
                      title={result.title}
                      author={result.author}
                      points={result.points} />
                ))}
              </ul>
            </>
          )
          : null
        }
        { error
          ? (
            <Alert variant="danger">
              <Alert.Heading>We're sorry, an error has occured</Alert.Heading>
              <p>
                There probably is an problem on our side, but there might also be a problem with your internet connection.
              </p>
              <p className="mb-0">
                Please try it again. If the problem still exists, plese contact your administrator.
              </p>
              <hr />
              <p>
                <p><b>Error message:</b></p>
                <Alert variant="light">
                  <pre className="mb-0">
                  { error.message }
                  </pre>
                </Alert>
              </p>
            </Alert>
          )
          : null
        }
      </Container>
    </>
  );
}
