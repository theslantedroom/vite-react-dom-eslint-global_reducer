import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

export const Swipeable = () => {
  const [boxSwipes, setBoxSwipes] = useState<any>([]);
  const [docSwipes, setDocSwipes] = useState<any>([]);

  const handlersBox = useSwipeable({
    onSwiped: ({ dir: swipeDirection, event }) => {
      // NOTE: this stops the propagation of the event
      // from reaching the document swipe listeners
      event.stopPropagation();
      setBoxSwipes((s: any) => [...s, { swipeDirection, timeStamp: Math.floor(event.timeStamp) }]);
    },

    onSwipedLeft: (SwipeEventData) => console.log(SwipeEventData), // (SwipeEventData) => void
    onSwipedRight: (SwipeEventData) => console.log(SwipeEventData),
    onSwipedUp: (SwipeEventData) => console.log(SwipeEventData),
    onSwipedDown: (SwipeEventData) => console.log(SwipeEventData),
    onSwipeStart: (SwipeEventData) => console.log(SwipeEventData),
    onSwiping: (SwipeEventData) => console.log(SwipeEventData),
    onTap: (SwipeEventData) => console.log(SwipeEventData),
    // Pass through callbacks, event provided: ({ event }) => void

    onTouchStartOrOnMouseDown: (SwipeEventData) => console.log(SwipeEventData),
    onTouchEndOrOnMouseUp: (SwipeEventData) => console.log(SwipeEventData),

    ...config,
  });
  const { ref: documentRef } = useSwipeable({
    onSwiped: ({ dir: swipeDirection, event }) => {
      setDocSwipes((s: any) => [...s, { swipeDirection, timeStamp: Math.floor(event.timeStamp) }]);
    },
  });

  // @ts-ignore
  useEffect(() => documentRef(document));

  return (
    <Box>
      <Typography>Document swipe with nested swipe</Typography>
      <Typography>Swipe anywhere to trigger document swipe</Typography>
      <Box>
        <Box>
          <p>Document swiped:</p>
          {docSwipes.map((s: any) => {
            return (
              <Typography key={s.timeStamp}>
                Swiped Doc: {s.swipeDirection} - {s.timeStamp}
              </Typography>
            );
          })}
        </Box>
        <Box>
          <Typography>Box swiped:</Typography>
          {boxSwipes.map((s: any) => {
            return (
              <Typography key={s.timeStamp}>
                Swiped Box: {s.swipeDirection} - {s.timeStamp}
              </Typography>
            );
          })}
        </Box>
      </Box>
      <Box {...handlersBox} sx={{ ...border }}>
        <Typography sx={{ ...border }}>Swipe here for Box</Typography>
        <Typography>
          Swipe anywhere to trigger document swipe, BUT if you swipe in the box we'll attempt to
          prevent the document swipe
        </Typography>
      </Box>
    </Box>
  );
};

const border = { border: '2px solid red' };
