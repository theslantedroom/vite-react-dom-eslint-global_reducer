import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, IconButton, Button } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

const buttonGroupsDefault = [
  {
    groupName: 'Actions',
    icon: <AirlineStopsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Left', icon: <ArrowCircleLeftIcon />, onClick: () => {} },
      { buttonName: 'Right', icon: <ArrowCircleRightIcon />, onClick: () => {} },
    ],
  },
  {
    groupName: 'Status',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Stats', icon: <AddCommentIcon />, onClick: () => {} },
      { buttonName: 'Flag', icon: <FlagCircleIcon />, onClick: () => {} },
      { buttonName: 'Add', icon: <AddReactionIcon />, onClick: () => {} },
    ],
  },

  {
    groupName: 'Other',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Road', icon: <AddRoadIcon />, onClick: () => {} },
      { buttonName: 'Add', icon: <AddToHomeScreenIcon />, onClick: () => {} },
      { buttonName: 'Battery20Icon', icon: <Battery20Icon />, onClick: () => {} },
      { buttonName: 'Brightness5Icon', icon: <Brightness5Icon />, onClick: () => {} },
    ],
  },
];

type ButtonGroup = keyof typeof buttonGroupsDefault;

export interface Props {
  buttonGroups?: ButtonGroup[];
}

export const SwipeableButton: React.FC<Props> = ({ buttonGroups = buttonGroupsDefault }) => {
  const [boxSwipes, setBoxSwipes] = useState<any>([]);
  const [lastSwipe, setLastSwipe] = useState<any>([]);
  const [lastClickNav, setLastClickNav] = useState<any>(null);
  const [currentGroup, setCurrentGroup] = useState<any>(buttonGroups[0]);

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
    onSwiping: (SwipeEventData) => console.log(SwipeEventData),
    onTap: (SwipeEventData) => console.log(SwipeEventData),
    // Pass through callbacks, event provided: ({ event }) => void

    onTouchStartOrOnMouseDown: (SwipeEventData) => console.log(SwipeEventData),
    onTouchEndOrOnMouseUp: (SwipeEventData) => console.log(SwipeEventData),

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
    switch (lastSwipe.swipeDirection || lastClickNav) {
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

  return (
    <Box {...handlersBox}>
      <Button variant="outlined">
        <Box>
          <Typography sx={{ ...centerFlexColumn }} variant="h6">
            {currentGroup.groupName}
          </Typography>
          <IconButton onClick={() => null}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton size="large" onClick={() => null}>
            {currentBtnState?.icon}
          </IconButton>
          <IconButton onClick={() => null}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Button>
    </Box>
  );
};

const border = { border: '2px solid grey' };

const buttonSize = { width: 56, height: 56 };
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
