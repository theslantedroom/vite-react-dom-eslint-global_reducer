import React, { useState } from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { TypeOut2 } from '../components/cards/DisplayData/TypeOut';
import { TimeDisplayFastTime } from '../components/TimeDisplayFastTime/TimeDisplayFastTime';
import TypeOut from 'react-typeout';
//style
export const FastTime = () => {
  const { cat, dog } = useGlobalContext();
  const [text, setText] = useState<string[]>([
    'You walk into a dark alley. You see a cat and a dog. What do you do?',
    'What are you doing?',
  ]);
  const handleDoneTyping = () => {
    setText(['thats all']);
    alert('d');
  };
  return (
    <div>
      <TimeDisplayFastTime realTimeOnRender={new Date()} message="..."></TimeDisplayFastTime>
    </div>
  );
};
