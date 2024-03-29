import React, { useRef, useState, useCallback, useEffect } from 'react';
import useMouse from '@react-hook/mouse-position';
import { useGamepads } from 'react-gamepads';
import intersectRect from 'intersect-rect';
import { useBoundingclientrect } from 'rooks';
import { XInputTrackBoxer } from '../MouseTrackBoxer/XInputTrackBoxer';
import { MouseTrackBoxerMouseControl } from '../MouseTrackBoxer/MouseTrackBoxerMouseControl';
import { Typography, Box, Stack } from '@mui/material';

export interface Props {}
export const BoxingRing: React.FC<Props> = React.forwardRef(({}, ref) => {
  // const [gamepads, setGamepads] = useState<any>({});
  // useGamepads((gamepads) => setGamepads(gamepads));

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const target = useRef(null);

  const mouse = useMouse(target, {
    fps: Infinity,
    enterDelay: 100,
    leaveDelay: 100,
  });

  const boardSize = vw > vh ? vh - 100 : vw - 100;

  const headRefA = useRef(null);
  const leftHandRefA = useRef(null);
  const rightHandRefA = useRef(null);

  const headRefB = useRef(null);
  const leftHandRefB = useRef(null);
  const rightHandRefB = useRef(null);

  const [isCoolDownA, setIsCoolDownA] = useState(false);
  const [isCoolDownB, setIsCoolDownB] = useState(false);

  const headRectA = useBoundingclientrect(headRefA);
  const leftHandRectA = useBoundingclientrect(leftHandRefA);
  const rightHandRectA = useBoundingclientrect(rightHandRefA);

  const headRectB = useBoundingclientrect(headRefB);
  const leftHandRectB = useBoundingclientrect(leftHandRefB);
  const rightHandRectB = useBoundingclientrect(rightHandRefB);

  const [isHeadHitA, setIsHeadHitA] = useState(false);
  const [isPunchReadyA, setIsPunchReadyA] = useState(false);
  const [isRightReadyA, setIsRightReadyA] = useState(false);

  const leftAHitHeadB = () => {
    if (!isPunchReadyA) return;
    setIsCoolDownB(true);
    setIsPunchReadyA(false);
    setTimeout(() => {
      setIsCoolDownB(false);
    }, 200);
  };
  const rightAHitHeadB = () => {
    if (!isPunchReadyA) return;
    setIsCoolDownB(true);
    setIsPunchReadyA(false);
    setTimeout(() => {
      setIsCoolDownB(false);
    }, 200);
  };

  useEffect(() => {
    if (
      !headRectA ||
      !leftHandRectA ||
      !rightHandRectA ||
      !headRectB ||
      !leftHandRectB ||
      !rightHandRectB
    )
      return;
    if (isCoolDownB) return;
    if (intersectRect(headRectB, leftHandRectA)) {
      leftAHitHeadB();
    }

    if (intersectRect(headRectB, rightHandRectA)) {
      rightAHitHeadB();
    }
    // if (intersectRect(headRectA, leftHandRectB)) {
    //   if (!isHeadHitA) setIsHeadHitA(true);
    // } else {
    //   if (isHeadHitA) setIsHeadHitA(false);
    // }

    // if (intersectRect(headRectA, rightHandRectB)) {
    //   if (!isHeadHitA) setIsHeadHitA(true);
    // } else {
    //   if (isHeadHitA) setIsHeadHitA(false);
    // }
  }, [mouse]);

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
    <Box id="boxingRing" sx={defCss} ref={target}>
      <Box sx={{ position: 'absolute', top: 0 }}>
        <XInputTrackBoxer
          headRefB={headRefB}
          leftHandRefB={leftHandRefB}
          rightHandRefB={rightHandRefB}
          isHeadHitB={isCoolDownB}
        />
      </Box>
      <Box sx={{ position: 'absolute', top: 0 }}>
        <MouseTrackBoxerMouseControl
          headRefA={headRefA}
          leftHandRefA={leftHandRefA}
          rightHandRefA={rightHandRefA}
          isHeadHitA={isHeadHitA}
          isPunchReadyA={isPunchReadyA}
          setIsPunchReadyA={setIsPunchReadyA}
        />
      </Box>
    </Box>
  );
});
