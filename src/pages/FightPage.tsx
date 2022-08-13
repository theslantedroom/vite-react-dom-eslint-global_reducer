import React from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { DisplayData } from '../components/cards/DisplayData/DisplayData';
import { FightTwo } from '../components/cards/DisplayData/FightTwo';
import { SpeakA } from '../components/cards/DisplayData/SpeakA';

import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { StreetLight } from '../components/StreetLight/StreetLight';
//style
export const FightPage = () => {
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

  const renderDead = (obj: any) => {
    return <Box>{obj.name?.toUpperCase() + 'Dead'}</Box>;
  };
  console.log('cat', cat);
  console.log('dog', dog);
  return (
    <Stack>
      {/* <DisplayData object={cat} /> */}

      {/* <SpeakA objectA={cat} objectB={dog} /> */}
      <FightTwo objectA={cat} objectB={dog} />
      {/* <DisplayData object={dog} /> */}
    </Stack>
  );
};
