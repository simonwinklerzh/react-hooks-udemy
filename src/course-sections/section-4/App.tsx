import React, { useEffect } from 'react';
import { handleErrors } from '../../utilities';

export default function App() {
  useEffect(() => {
    fetch('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(handleErrors)
      .then(response => response.json())
      .then(responseObject => {
        console.log('ok');
        console.log(responseObject)
      })
      .catch(console.error);

  });

  return (
    <div>App Section 4</div>
  );
}
