import React, { useState } from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { TypeOut2 } from '../components/cards/DisplayData/TypeOut';
import TypeOut from 'react-typeout';
//style
export const Home = () => {
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
      <TypeOut2 objectA={cat} objectB={dog} text={text}></TypeOut2>

      <TypeOut words={text} typeSpeed={50} rewindSpeed={0} caret={true} done={handleDoneTyping} />
    </div>
  );
};
