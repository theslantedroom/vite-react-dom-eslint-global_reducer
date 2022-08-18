import React, { useState } from 'react';

import { Typography, Box, Button, Stack, Divider } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { BoxerFight } from '../components/cards/DisplayData/BoxerFight';
import TypeOut from 'react-typeout';

import { SwipeableButton } from '../components/SwipeableButton/SwipeableButton';
import { swipableButtonBoxing } from '../components/SwipeableButton/swipableButtonBoxing';
import { generateBoxer } from '../classes/classes';

export const BoxingLog = () => {
  // const { boxerOne, boxerTwo } = useGlobalContext();
  const [boxerTwo, setBoxerTwo] = useState(generateBoxer());
  const [boxerOne, setBoxerOne] = useState(generateBoxer());

  const [text, setText] = useState<string[]>([
    `Welcome to Fight Night.`,
    `Tonight ${boxerOne.name} vs  ${boxerTwo.name}`,
    `This component uses Class Inheritance to make Living > Sentient > Human > Boxers.`,
  ]);
  const handleDoneTyping = () => {
    setText(['thats all']);
  };

  const generate = () => {
    setBoxerOne(generateBoxer());
    setBoxerTwo(generateBoxer());
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
        <Typography>{`${boxerOne.name}`}</Typography>
        <Typography>{` vs `}</Typography>
        <Typography>{`${boxerTwo.name}`}</Typography>
      </Stack>
      {/* Human Stats */}
      {renderStatRows(boxerOne.humanStats, boxerTwo.humanStats)}
      {renderStatRows(boxerOne.boxingStats, boxerTwo.boxingStats)}

      <Divider sx={{ p: 1 }}></Divider>
      <BoxerFight objectA={boxerOne} objectB={boxerTwo} text={text}></BoxerFight>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {/* TYPE LOG */}

        <Typography sx={{ textAlign: 'center' }}>
          <TypeOut
            words={text}
            typeSpeed={50}
            rewindSpeed={0}
            caret={true}
            done={handleDoneTyping}
          />
        </Typography>

        <Button onClick={generate} variant="contained">
          Generate
        </Button>
      </Stack>

      <Box sx={{ ...centerFlexRow }}>
        <SwipeableButton buttonGroups={swipableButtonBoxing}></SwipeableButton>
        <SwipeableButton buttonGroups={swipableButtonBoxing}></SwipeableButton>
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
