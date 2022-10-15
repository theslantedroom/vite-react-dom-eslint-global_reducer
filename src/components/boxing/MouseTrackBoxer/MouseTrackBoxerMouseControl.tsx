import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';

import { Typography, Box, Stack } from '@mui/material';

export interface Props {
  headRefA: any;
  leftHandRefA: any;
  rightHandRefA: any;
  isHeadHitA?: boolean;
}

export const MouseTrackBoxerMouseControl: React.FC<Props> = ({
  headRefA,
  leftHandRefA,
  rightHandRefA,
  isHeadHitA = false,
}) => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const boardSize = vw > vh ? vh - 100 : vw - 100;
  const headSize = boardSize / 5;
  const fistSize = headSize / 2;
  const boundBoxBuffer = boardSize * 0.01;

  const target = useRef(null);
  const [isControlling, setIsControlling] = useState(true);
  const [useRightHand, setUseRightHand] = useState(true);
  const [isMouseXNegative, setIsMouseXNegative] = useState(false);

  const player1 = {
    head: <div></div>,
    left: <div></div>,
    right: <div></div>,
  } as any;

  const mouse = useMouse(target, {
    fps: Infinity,
    enterDelay: 100,
    leaveDelay: 100,
  });

  useEffect(() => {
    if (!mouse.elementHeight || !mouse.elementWidth || !mouse.x || !mouse.y) {
      return;
    }
    if (mouse.y < mouse.elementHeight / 2) {
      return;
    }
    setIsMouseXNegative(mouse.x < mouse.elementWidth / 2);

    setUseRightHand(mouse.x > mouse.elementWidth / 2);
  }, [mouse]);

  const headStyle = useCallback((): React.CSSProperties => {
    const headSize = boardSize / 5;
    const headCss = {
      position: 'absolute' as any,
      bottom: `${boardSize / 10}px`,
      left: `${boardSize / 2 - headSize / 2}px`,
      width: headSize,
      backgroundColor: '#eebb99',
      height: headSize,
      border: isHeadHitA ? `${boundBoxBuffer}px solid red` : `none`,
      outline: isHeadHitA ? `${boundBoxBuffer}px solid red` : `${boundBoxBuffer}px solid #eebb99`,
      borderRadius: 1000,
    };

    if (!mouse.elementHeight || !mouse.elementWidth || !mouse.x || !mouse.y || !isControlling) {
      return headCss;
    }

    const xMod = isMouseXNegative
      ? mouse.elementWidth / 2 - headSize / 2 + mouse.x / 5
      : (mouse.elementWidth / 2 - headSize / 2 + mouse.x / 5) * 1;

    const yMod = mouse.elementHeight;
    const headStyleCss = {
      width: headSize,
      height: headSize,
      left: Math.min(xMod, mouse.elementHeight),
      top: Math.min(yMod, mouse.elementHeight - headSize),
    } as React.CSSProperties;

    return { ...headCss, ...headStyleCss };
  }, [mouse, isControlling]);

  const fistStyle = useCallback(
    (options: any): React.CSSProperties => {
      const { isLead, isActive } = options;
      const guardGap = fistSize * 0.5;
      const fistCss = {
        position: 'absolute' as any,
        bottom: `${boardSize / 4}px`,
        left: `${
          boardSize / 2 - fistSize / 2 + (isLead ? (boardSize / 15) * -1 : boardSize / 15)
        }px`,
        width: fistSize,
        height: fistSize,
        backgroundColor: 'red',
        borderRadius: 1000,
      };

      if (!mouse.elementHeight || !mouse.elementWidth || !mouse.x || !mouse.y || !isControlling) {
        return fistCss;
      }

      const xMod = mouse.x + (isLead ? guardGap : -guardGap);
      const yMod = mouse.y;
      const fistStyleCss = {
        width: fistSize,
        height: fistSize,
        left: Math.min(xMod, mouse.elementHeight + fistSize / 2),
        top: Math.min(yMod, mouse.elementHeight + fistSize / 2),
      } as React.CSSProperties;

      const xModB =
        mouse.elementWidth / 2 - fistSize / 2 + mouse.x / 10 + (isLead ? guardGap : -guardGap) + 1;
      const yModB = mouse.elementHeight - 200 + mouse.y / 10 - mouse.y / 10;
      const isActiveCss = isActive
        ? {
            border: '2px solid yellow',
          }
        : ({
            width: fistSize,
            height: fistSize,
            left: Math.min(xModB, mouse.elementHeight),
            top: Math.min(yModB, mouse.elementHeight),
          } as React.CSSProperties);

      return { ...fistCss, ...fistStyleCss, ...isActiveCss };
    },
    [mouse, isControlling]
  );

  player1.head = (
    <div
      ref={headRefA}
      onClick={() => setIsControlling(true)}
      style={{
        ...headStyle(),
      }}
    />
  );

  player1.left = (
    <div
      ref={leftHandRefA}
      style={{
        ...fistStyle({ isLead: true, isActive: useRightHand }),
      }}
    />
  );
  player1.right = (
    <div
      ref={rightHandRefA}
      style={{
        ...fistStyle({ isLead: false, isActive: !useRightHand }),
      }}
    />
  );

  // if (isControlling) defCss.cursor = 'none';

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
    border: '1px solid red',
    whiteSpace: 'pre',
    touchAction: 'none',
    position: 'relative',
    transition: 'all 2s',
    transitionDuration: '500ms',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <Box sx={defCss} ref={target}>
        {player1.head}
        {player1.left}
        {player1.right}
      </Box>
    </div>
  );
};
