import { useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const abortConst = new AbortController();

  fetch(url, { signal: abortConst.signal })
    .then((res) => {
      if (!res.ok) {
        throw Error('fetch failure');
      } else res.json();
    })
    .then((data) => {
      setData(data);
      setIsPending(false);
      setError(null);
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted');
      } else {
        setError(err.message);
        setIsPending(false);
      }
      return () => abortConst.abort(); //cleanup function
    });

  return data, isPending, error;
};

export default useFetch;
