import React, { useEffect, useState } from 'react';
import { handleErrors } from '../../utilities';

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

export default function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(handleErrors)
      .then(response => response.json())
      .then(responseObject => {
        setResults(responseObject.hits);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div>App Section 4</div>
      <ul>
        {results.map((result: INewsListEntry, index) => (
          <NewsListEntry key={index}
            url={result.url}
            title={result.title}
            author={result.author} />
        ))}
      </ul>
    </>
  );
}
