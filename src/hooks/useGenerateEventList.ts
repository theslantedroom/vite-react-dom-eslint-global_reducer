import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useGenerateEventList(query: any, page: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState(['test']);

  const sendQuery = useCallback(
    async (e: any) => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`);
        setList((prev): any => [
          ...new Set([...prev, ...res.data.docs.map((d: { title: any }) => d.title)]),
        ]);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    },
    [query, page]
  );

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}
