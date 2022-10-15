import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';

import { XInputTrackBoxer } from '../MouseTrackBoxer/XInputTrackBoxer';
import { MouseTrackBoxerMouseControl } from '../MouseTrackBoxer/MouseTrackBoxerMouseControl';
import { Typography, Box, Stack } from '@mui/material';

export interface Props {}
export const BoxingRing: React.FC<Props> = ({}) => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const boardSize = vw > vh ? vh - 100 : vw - 100;

  const defCss = {
    width: `${boardSize}px`,
    height: `${boardSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    margin: '0px',
    borderRadius: '16px',
    outline: 'solid 10px rgba(255, 0, 0, 0.4)',
    whiteSpace: 'pre',
    touchAction: 'none',
    position: 'absolute',
    transition: 'all 2s',
    transitionDuration: '500ms',
  };

  return (
    <Box id="boxingRing" sx={defCss}>
      <Box sx={{ position: 'absolute', top: 0 }}>
        <XInputTrackBoxer />
      </Box>
      <Box sx={{ position: 'absolute', top: 0 }}>
        <MouseTrackBoxerMouseControl />
      </Box>
    </Box>
  );
};
