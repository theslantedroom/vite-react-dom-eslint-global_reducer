import React, { useEffect, useState } from 'react';

export const useSaveObjectLocalStorage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const items = JSON.parse(localStorage?.getItem('items') || '');
    if (items) {
      setItems(items);
    }
  }, []);

  return {};
};
