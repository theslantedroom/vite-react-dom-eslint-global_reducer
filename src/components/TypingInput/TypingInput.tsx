import React, { useCallback, useEffect, useState } from 'react';

import {
  Avatar,
  IconButton,
  Typography,
  Menu,
  TextField,
  Stack,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import { Preview } from '@mui/icons-material';

export interface Props {
  wordArray: string[];
}
export const TypingInput: React.FC<Props> = ({ wordArray = ['warm up', 'train'] }) => {
  const [currentWorkToType, setCurrentWordToType] = useState(wordArray[0]);
  const [nextWorkToType, setNextWordToType] = useState(wordArray[1]);
  const [inputText, setInputText] = useState('');
  const [workIndex, setWorkIndex] = useState(0);

  const checkText = (text: string) => {
    if (text === currentWorkToType) {
      setCurrentWordToType(nextWorkToType);
      setInputText('');
      setWorkIndex((prev) => prev + 1);

      const index = (workIndex + 1) % wordArray.length;
      console.log('index', index);
      setNextWordToType(wordArray[index]);
    }
  };

  useEffect(() => {
    checkText(inputText);
  }, [inputText]);

  return (
    <Box sx={{ overflow: 'hidden', p: 1 }}>
      <Typography variant="h4" gutterBottom>
        {nextWorkToType}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {currentWorkToType}
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          autoFocus
          label="type..."
          variant="standard"
          color="warning"
          autoComplete="type the word above^"
          focused
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          inputProps={{ maxLength: 50 }}
        />
      </Box>
    </Box>
  );
};
