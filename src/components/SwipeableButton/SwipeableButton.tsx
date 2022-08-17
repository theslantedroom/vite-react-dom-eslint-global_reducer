import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { useSwipeable } from 'react-swipeable';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import Battery20Icon from '@mui/icons-material/Battery20';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: true, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

const buttonGroupsDefault = [
  {
    groupName: 'numbers',
    icon: <AirlineStopsIcon />,
    onClick: () => {},
    states: [
      { buttonName: '1', icon: <ArrowCircleLeftIcon />, onClick: () => {} },
      { buttonName: '2', icon: <ArrowCircleRightIcon />, onClick: () => {} },
      { buttonName: '3', icon: <ArrowCircleRightIcon />, onClick: () => {} },
      { buttonName: '4', icon: <ArrowCircleRightIcon />, onClick: () => {} },
    ],
  },
  {
    groupName: 'letters',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'A', icon: <AddCommentIcon />, onClick: () => {} },
      { buttonName: 'B', icon: <FlagCircleIcon />, onClick: () => {} },
      { buttonName: 'C', icon: <AddReactionIcon />, onClick: () => {} },
      { buttonName: 'D', icon: <AddReactionIcon />, onClick: () => {} },
    ],
  },

  {
    groupName: 'File',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Exit', icon: <AddRoadIcon />, onClick: () => {} },
      { buttonName: 'Save', icon: <AddToHomeScreenIcon />, onClick: () => {} },
      { buttonName: 'Load', icon: <Battery20Icon />, onClick: () => {} },
    ],
  },
];

type ButtonGroups = typeof buttonGroupsDefault;
type CurrentButtonGroup = typeof buttonGroupsDefault[0];

export interface Props {
  buttonGroups?: ButtonGroups;
}

export const SwipeableButton: React.FC<Props> = ({ buttonGroups = buttonGroupsDefault }) => {
  const [boxSwipes, setBoxSwipes] = useState<any>([]);
  const [lastSwipe, setLastSwipe] = useState<any>([]);
  const [lastClickNav, setLastClickNav] = useState<any>(null);
  const [currentGroup, setCurrentGroup] = useState<CurrentButtonGroup>(buttonGroups[0]);
  const [clickCount, setClickCount] = useState(0);

  const [currentBtnState, setCurrentBtnState] = useState<any>(buttonGroupsDefault[0].states[0]);

  const handlersBox = useSwipeable({
    onSwiped: ({ dir: swipeDirection, event }) => {
      // NOTE: this stops the propagation of the event
      // from reaching the document swipe listeners
      event.stopPropagation();
      setBoxSwipes((s: any) => [...s, { swipeDirection, timeStamp: Math.floor(event.timeStamp) }]);
      setLastSwipe({ swipeDirection, timeStamp: Math.floor(event.timeStamp) });
    },
    onSwipedLeft: (SwipeEventData) => console.log(SwipeEventData), // (SwipeEventData) => void
    onSwipedRight: (SwipeEventData) => console.log(SwipeEventData),
    onSwipedUp: (SwipeEventData) => console.log(SwipeEventData),
    onSwipedDown: (SwipeEventData) => console.log(SwipeEventData),
    onSwipeStart: (SwipeEventData) => console.log(SwipeEventData),
    // onSwiping: (SwipeEventData) => console.log(SwipeEventData),
    // onTap: (SwipeEventData) => console.log(SwipeEventData),
    // Pass through callbacks, event provided: ({ event }) => void

    // onTouchStartOrOnMouseDown: (SwipeEventData) => console.log(SwipeEventData),
    // onTouchEndOrOnMouseUp: (SwipeEventData) => console.log(SwipeEventData),

    ...config,
  });

  const { ref: documentRef } = useSwipeable({});

  const processGroupIndex = useCallback(
    (array: any[], steps: number) => {
      const index = array.findIndex((element: any) => {
        if (element.groupName === currentGroup.groupName) {
          return true;
        }
        return false;
      });

      if (index + steps < 0) return array.length - 1;
      if (index + steps > array.length - 1) return 0;
      return index + steps;
    },
    [currentGroup]
  );

  const processStateIndex = useCallback(
    (array: any[], steps: number) => {
      const index = array.findIndex((element: any) => {
        if (element.buttonName === currentBtnState.buttonName) {
          return true;
        }
        return false;
      });

      if (index + steps < 0) return array.length - 1;
      if (index + steps > array.length - 1) return 0;
      return index + steps;
    },
    [currentBtnState]
  );

  // @ts-ignore
  useEffect(() => documentRef(document));

  useEffect(() => {
    console.log('lastSwipe.timeStamp', lastSwipe.timeStamp);
    console.log('lastClickNav.timeStamp', lastClickNav?.timeStamp);

    switch (lastSwipe.swipeDirection || lastClickNav?.direction) {
      case 'Left':
        setCurrentBtnState(currentGroup.states[processStateIndex(currentGroup.states, 1)]);
        break;
      case 'Right':
        setCurrentBtnState(currentGroup.states[processStateIndex(currentGroup.states, -1)]);
        break;
      case 'Up':
        setCurrentGroup(buttonGroups[processGroupIndex(buttonGroups, 1)]);
        break;
      case 'Down':
        setCurrentGroup(buttonGroups[processGroupIndex(buttonGroups, -1)]);
        break;
    }
  }, [lastSwipe, lastClickNav]);

  useEffect(() => {
    setCurrentBtnState(currentGroup.states[0]);
  }, [currentGroup]);

  const handleClickNav = (direction: string) => {
    console.log('direction', direction);
    // setLastClickNav({ direction: direction, timeStamp: Math.floor(Date.now()) });
    setClickCount((prev) => prev + 1);
  };

  return (
    <Box {...handlersBox}>
      <Button variant="outlined">
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
          <Box>
            <Typography sx={{ ...centerFlexRow }} variant="h6">
              {currentGroup.groupName}
            </Typography>
            <Typography sx={{ ...centerFlexRow }} variant="caption">
              {currentBtnState.buttonName}
            </Typography>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={2}>
              <KeyboardArrowDownIcon
                onClick={() => handleClickNav('Up')}
                sx={{ transform: 'rotate(180deg)' }}
              />
              <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
                <KeyboardArrowDownIcon
                  onClick={() => handleClickNav('Left')}
                  sx={{ transform: 'rotate(90deg)' }}
                />
                {currentBtnState?.icon}
                <KeyboardArrowDownIcon
                  onClick={() => handleClickNav('Right')}
                  sx={{ transform: 'rotate(-90deg)' }}
                />
              </Stack>
              <KeyboardArrowDownIcon onClick={() => handleClickNav('Down')} />
            </Stack>
          </Box>
        </Stack>
      </Button>
    </Box>
  );
};

const border = { border: '2px solid grey' };

const buttonSize = { width: 15, height: 15 };
const centerFlexRow = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};
const centerFlexColumn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
