import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';

import { SwipeableButton } from './../components/Swipeable/SwipeableButton';

export const SwipeablePage = () => {
  return (
    <Box sx={{ ...centerFlexColumn }}>
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
