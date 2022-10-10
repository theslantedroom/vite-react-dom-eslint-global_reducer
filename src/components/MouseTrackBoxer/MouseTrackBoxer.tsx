import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';
import { styles } from '@dash-ui/styles';

import { Typography, Box } from '@mui/material';
const boardSize = 500;

export interface Props {
  optional?: boolean;
  required: string;
}
export const MouseTrackBoxer: React.FC<Props> = ({ optional = true, required }) => {
  return (
    <>
      <Draw />
    </>
  );
};

function Draw() {
  const target = useRef(null);
  const [isControlling, setIsControlling] = useState(true);
  const [useRightHand, setUseRightHand] = useState(true);

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

    setUseRightHand(mouse.x > mouse.elementWidth / 2);
  }, [mouse]);

  const headStyle = useCallback((): React.CSSProperties => {
    const headSize = boardSize / 5;
    const headCss = {
      position: 'absolute' as any,
      bottom: `${boardSize / 10}px`,
      left: `${boardSize / 2 - headSize / 2}px`,
      width: headSize,
      height: headSize,
      backgroundColor: '#eebb99',
      borderRadius: 1000,
    };

    if (!mouse.elementHeight || !mouse.elementWidth || !mouse.x || !mouse.y || !isControlling) {
      return headCss;
    }

    const xMod = mouse.elementWidth / 2 - headSize / 2 + mouse.x / 10;
    const yMod = mouse.elementHeight - 200 + mouse.y / 10;

    const headStyleCss = {
      width: headSize,
      height: headSize,
      left: Math.min(xMod, mouse.elementHeight),
      top: Math.min(yMod, mouse.elementHeight),
    } as React.CSSProperties;

    return { ...headCss, ...headStyleCss };
  }, [mouse, isControlling]);

  const fistStyle = useCallback(
    (options: any): React.CSSProperties => {
      const { isLead, isActive } = options;
      const fistSize = 50;
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
      onClick={() => setIsControlling(true)}
      style={{
        ...headStyle(),
      }}
    />
  );

  if (mouse.x && mouse.elementWidth && mouse.y && mouse.elementHeight) {
    player1.left = (
      <div
        style={{
          ...fistStyle({ isLead: true, isActive: useRightHand }),
        }}
      />
    );
    player1.right = (
      <div
        style={{
          ...fistStyle({ isLead: false, isActive: !useRightHand }),
        }}
      />
    );
  }

  // if (isControlling) defCss.cursor = 'none';
  return (
    <div>
      <Box sx={defCss} ref={target}>
        {player1.head}
        {player1.left}
        {player1.right}
        {/* {drawing} */}
      </Box>
      <div>{useRightHand ? 'left' : 'right'}</div>
      <div>
        x:{mouse.x} / {mouse.elementWidth}
      </div>
      <div>
        y:{mouse.y} / {mouse.elementHeight}
      </div>
    </div>
  );
}

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
