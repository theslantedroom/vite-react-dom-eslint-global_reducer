import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';

import { useGamepads } from 'react-gamepads';
import { GamepadsProvider } from 'react-gamepads';
import { Typography, Box, Stack } from '@mui/material';

export interface Props {
  optional?: boolean;
}
export const XInputTrackBoxer: React.FC<Props> = ({ optional = true }) => {
  const [gamepads, setGamepads] = useState<any>({});
  const [leftYScale, setLeftYScale] = useState(Math.round(window.innerHeight / 2));
  const [leftXScale, setLeftXScale] = useState(Math.round(window.innerWidth / 2));
  const [rightYScale, setRightYScale] = useState(Math.round(window.innerHeight / 2));
  const [rightXScale, setRightXScale] = useState(Math.round(window.innerWidth / 2));

  const [slipLeft, setSlipLeft] = useState(0);
  const [slipRight, setSlipRight] = useState(0);
  useGamepads((gamepads) => setGamepads(gamepads));
  useEffect(() => {
    const defaultGamepad = Object.keys(gamepads).length > 0 ? gamepads[0] : {};
    if ('buttons' in defaultGamepad) {
      // console.log('L', defaultGamepad.buttons[6]);
      // console.log('L', defaultGamepad.buttons[7]);
      setSlipLeft(defaultGamepad.buttons[6].value);
      setSlipRight(defaultGamepad.buttons[7].value);
    }
    if ('axes' in defaultGamepad) {
      setLeftYScale(defaultGamepad.axes[1]);
      setLeftXScale(defaultGamepad.axes[0]);
      setRightYScale(defaultGamepad.axes[3]);
      setRightXScale(defaultGamepad.axes[2]);
    }
  }, [gamepads]);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const boardSize = vw > vh ? vh - 100 : vw - 100;
  const reachLeft = 2.5;
  const reachRight = 2.5;

  const headSize = boardSize / 5;
  const fistSize = headSize / 2;

  const slipXMod = (slipLeft * (boardSize / 3) - slipRight * (boardSize / 3)) * -1;

  const headTop = boardSize / 10;
  const headLeft = boardSize / 2 - headSize / 2 + slipXMod;

  //Left
  const leftHandStartX = boardSize / 2 - fistSize / 2 - fistSize / 2 + fistSize / 2;
  const leftHandStartY = boardSize * 0.25;

  const leftTop = leftHandStartY + leftYScale * reachLeft * leftHandStartY;
  const leftLeft = leftHandStartX + leftXScale * leftHandStartX;

  // Right
  const rightHandStartX = boardSize / 2 - fistSize / 2;
  const rightHandStartY = boardSize * 0.25;

  const rightTop = rightHandStartY + rightYScale * reachRight * rightHandStartY;
  const rightLeft = rightHandStartX + rightXScale * rightHandStartX;

  const rightHandTop = rightTop > 0 ? rightTop : 0;
  const leftHandTop = leftTop > 0 ? leftTop : 0;

  const leftTopFinal = leftHandTop;
  const rightTopFinal = rightHandTop;

  // Body Parts
  const player2 = {
    head: (
      <div
        style={{
          position: 'absolute' as any,
          top: `${headTop}px`,
          left: `${headLeft}px`,
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
          top: `${leftTopFinal}px`,
          left: `${leftLeft}px`,
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
          top: `${rightTopFinal}px`,
          left: `${rightLeft}px`,
          width: fistSize,
          height: fistSize,
          backgroundColor: 'blue',
          borderRadius: 1000,
        }}
      />
    ),
  } as any;

  const defCss = {
    overflow: 'hidden',
    width: `${boardSize}px`,
    height: `${boardSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    padding: '16px',
    borderRadius: '16px',
    border: '2px solid skyblue',
    whiteSpace: 'pre',
    touchAction: 'none',
    position: 'relative',
    transition: 'all 2s',
    transitionDuration: '500ms',
  };

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
