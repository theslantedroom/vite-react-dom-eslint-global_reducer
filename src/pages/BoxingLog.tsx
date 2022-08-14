import React, { useState } from 'react';

import { Typography, Box, Button, Stack, Divider } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { BoxerFight } from '../components/cards/DisplayData/BoxerFight';
import TypeOut from 'react-typeout';
//style
export const BoxingLog = () => {
  const { testBoxerOne, testBoxerTwo } = useGlobalContext();

  console.log('boxers', testBoxerOne, testBoxerTwo);

  const [text, setText] = useState<string[]>([
    'You walk into a dark alley. You see a cat and a dog. What do you do?',
    'What are you doing?',
  ]);
  const handleDoneTyping = () => {
    setText(['thats all']);
  };

  testBoxerOne.speak();
  const generate = () => {
    setText(['thats all']);

    console.log('testBoxerOne', testBoxerOne);
    testBoxerOne.speak();
  };
  return (
    <div>
      <Button onClick={generate} variant="contained">
        Generate
      </Button>
      <Divider sx={{ p: 1 }}></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Typography>{`${testBoxerOne.name}`}</Typography>
        <Typography>{` vs `}</Typography>
        <Typography>{`${testBoxerTwo.name}`}</Typography>
      </Stack>
      <BoxerFight objectA={testBoxerOne} objectB={testBoxerTwo} text={text}></BoxerFight>
    </div>
  );
};
