import React from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';

//style
export const Home = () => {
  const { cat, dog } = useGlobalContext();

  return (
    <div>
      <h1>START</h1>
    </div>
  );
};
