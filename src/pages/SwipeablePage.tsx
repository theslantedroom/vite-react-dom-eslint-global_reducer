import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';

import { SwipeableButton } from '../components/SwipeableButton/SwipeableButton';

export const SwipeablePage = () => {
  return (
    <Box sx={{ ...centerFlexRow }}>
      <SwipeableButton></SwipeableButton>
    </Box>
  );
};

const border = { border: '2 px solid red' };

const centerFlexColumn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const centerFlexRow = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
