import React, { useState } from 'react';

import { Typography, Box, Button, Stack, Divider } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { BoxerFight } from '../components/cards/DisplayData/BoxerFight';
import TypeOut from 'react-typeout';

import { SwipeableButton } from './../components/Swipeable/SwipeableButton';

export const BoxingLog = () => {
  const { testBoxerOne, testBoxerTwo } = useGlobalContext();

  console.log('boxers', testBoxerOne, testBoxerTwo);

  const [text, setText] = useState<string[]>([
    `Welcome to Fight Night.`,
    `Tonight ${testBoxerOne.name} vs  ${testBoxerTwo.name}`,
  ]);
  const handleDoneTyping = () => {
    setText(['thats all']);
  };

  testBoxerOne.speak();
  const generate = () => {
    setText(['thats all']);
    testBoxerOne.speak();
  };

  const renderStatRows = (boxerStatsA: any, boxerStatsB: any) => {
    return (
      <>
        {boxerStatsA.map((stat: any, i: number) => {
          return (
            <Stack
              key={stat.name}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography>{`${stat?.value}`}</Typography>
              <Typography>{`${stat?.name}`}</Typography>
              <Typography>{`${boxerStatsB[i]?.value}`}</Typography>
            </Stack>
          );
        })}
      </>
    );
  };

  return (
    <Box>
      <Divider sx={{ p: 1 }}></Divider>
      {/* Names */}
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Typography>{`${testBoxerOne.name}`}</Typography>
        <Typography>{` vs `}</Typography>
        <Typography>{`${testBoxerTwo.name}`}</Typography>
      </Stack>
      {/* Human Stats */}
      {renderStatRows(testBoxerOne.humanStats, testBoxerTwo.humanStats)}
      {renderStatRows(testBoxerOne.boxingStats, testBoxerTwo.boxingStats)}

      <Divider sx={{ p: 1 }}></Divider>
      <BoxerFight objectA={testBoxerOne} objectB={testBoxerTwo} text={text}></BoxerFight>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <TypeOut words={text} typeSpeed={50} rewindSpeed={0} caret={true} done={handleDoneTyping} />
        <Button onClick={generate} variant="contained">
          Generate
        </Button>
      </Stack>

      <Box sx={{ ...centerFlexRow }}>
        <SwipeableButton></SwipeableButton>
        <SwipeableButton></SwipeableButton>
      </Box>
    </Box>
  );
};

const centerFlexRow = {
  p: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
