import React from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';

import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { StreetLight } from '../components/StreetLight/StreetLight';
//style
export const StreetLightXstate = () => {
  const { cat, dog } = useGlobalContext();

  const renderAlive = (obj: any) => {
    return (
      <Stack
        sx={{ height: '100%' }}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <ProgressBar value={obj.health} message={obj.name?.toUpperCase()} />
      </Stack>
    );
  };

  console.log('cat', cat);
  console.log('dog', dog);
  return (
    <Stack>
      {/* <DisplayData object={cat} /> */}

      <StreetLight />
      {/* <DisplayData object={dog} /> */}
    </Stack>
  );
};
