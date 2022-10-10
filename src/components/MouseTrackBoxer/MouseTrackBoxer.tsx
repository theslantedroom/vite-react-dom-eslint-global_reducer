import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';

import { useGamepads } from 'react-gamepads';
import { GamepadsProvider } from 'react-gamepads';
import { Typography, Box, Stack } from '@mui/material';
const boardSize = 500;

export interface Props {
  optional?: boolean;
  required: string;
}
export const MouseTrackBoxer: React.FC<Props> = ({ optional = true, required }) => {
  const [gamepads, setGamepads] = useState<any>({});
  const [leftYScale, setLeftYScale] = useState(Math.round(window.innerHeight / 2));
  const [leftXScale, setLeftXScale] = useState(Math.round(window.innerWidth / 2));
  const [rightYScale, setRightYScale] = useState(Math.round(window.innerHeight / 2));
  const [rightXScale, setRightXScale] = useState(Math.round(window.innerWidth / 2));
  useGamepads((gamepads) => setGamepads(gamepads));
  useEffect(() => {
    const defaultGamepad = Object.keys(gamepads).length > 0 ? gamepads[0] : {};
    if ('buttons' in defaultGamepad) {
      // console.log('button press');
    }
    if ('axes' in defaultGamepad) {
      setLeftYScale(defaultGamepad.axes[1]);
      setLeftXScale(defaultGamepad.axes[0]);
      setRightYScale(defaultGamepad.axes[3]);
      setRightXScale(defaultGamepad.axes[2]);
    }
  }, [gamepads]);

  const headSize = boardSize / 5;
  const fistSize = headSize / 2;

  const leftHandStartX = boardSize / 2 - fistSize / 2 - fistSize / 2;
  const leftHandStartY = boardSize / 4;

  const rightHandStartX = boardSize / 2 - fistSize / 2 + fistSize / 2;
  const rightHandStartY = boardSize / 4;
  const player2 = {
    head: (
      <div
        style={{
          position: 'absolute' as any,
          top: `${boardSize / 10}px`,
          left: `${boardSize / 2 - headSize / 2}px`,
          width: headSize,
          height: headSize,
          backgroundColor: '#eebb99',
          borderRadius: 1000,
        }}
      />
    ),
    leftHand: (
      <div
        style={{
          position: 'absolute' as any,
          top: `${leftHandStartY + leftYScale * leftHandStartY}px`,
          left: `${leftHandStartX + leftXScale * leftHandStartX}px`,
          width: fistSize,
          height: fistSize,
          backgroundColor: 'blue',
          borderRadius: 1000,
        }}
      />
    ),
    rightHand: (
      <div
        style={{
          position: 'absolute' as any,
          top: `${rightHandStartY + rightYScale * rightHandStartY}px`,
          left: `${rightHandStartX + rightXScale * rightHandStartX}px`,
          width: fistSize,
          height: fistSize,
          backgroundColor: 'blue',
          borderRadius: 1000,
        }}
      />
    ),
  } as any;

  return (
    <Stack>
      <Box sx={defCss}>
        <GamepadsProvider>
          {player2.head}
          {player2.leftHand}
          {player2.rightHand}
        </GamepadsProvider>
      </Box>
      <div>leftYScale:{leftYScale}</div>
      <div>leftXScale:{leftXScale}</div>
      <div>rightYScale:{rightYScale}</div>
      <div>rightXScale:{rightXScale}</div>
    </Stack>
  );
};

const defCss = {
  overflow: 'hidden',
  cursor: 'none',
  width: `${boardSize}px`,
  height: `${boardSize}px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  padding: '16px',
  borderRadius: '16px',
  border: '1px solid skyblue',
  whiteSpace: 'pre',
  touchAction: 'none',
  position: 'relative',
  transition: 'all 2s',
  transitionDuration: '500ms',
};
