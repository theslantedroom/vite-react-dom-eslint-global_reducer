import React from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext.jsx';
import { DisplayData } from '../components/cards/DisplayData/DisplayData.jsx';
import { FightTwo } from '../components/cards/DisplayData/FightTwo.jsx';
//style
export const Home = () => {
  const { cat, dog } = useGlobalContext();
  return (
    <Stack>
      <DisplayData object={cat} />
      <FightTwo objectA={cat} objectB={dog} />
      <DisplayData object={dog} />
    </Stack>
  );
};
