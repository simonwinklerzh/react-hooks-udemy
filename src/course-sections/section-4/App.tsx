import React, { useEffect, useState } from 'react';
import { handleErrors } from '../../utilities';

// Properties that we expect to get from the server
export interface INewsListEntryRaw {
  url?: string;
  title?: string;
  story_url?: string;
  story_title?: string;
  author?: string;
}

// Properties that we need to have for rendering our news list
export interface INewsListEntry {
  url?: string;
  title: string;
  author: string;
}

export const NewsListEntry = ({
  url,
  title,
  author
}: INewsListEntry) => (
  <li>
    { url
      ? <a href={url}>{title}</a>
      : <span>{title}</span>
    }
    &nbsp;
    <small>Author: <b>{author}</b></small>
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

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getResults();
  }, [query]);

  const getResults = async () => {
    if (!query) {
      return;
    }
    const currentQuery = `http://hn.algolia.com/api/v1/search?query=${query}`;
    mostRecentQuery = currentQuery;
    fetch(currentQuery)
      .then(handleErrors)
      .then(response => response.json())
      .then(responseObject => {
        if (currentQuery === mostRecentQuery) {
          setResults(responseObject.hits);
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <div>App Section 4</div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }} />
      <ul>
        {results
          .reduce(normalizeResults, [])
          .map((result: INewsListEntry, index) => (
            <NewsListEntry key={index}
              url={result.url}
              title={result.title}
              author={result.author} />
        ))}
      </ul>
    </>
  );
}
