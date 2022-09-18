import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';

import {
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Box,
  Divider,
  Chip,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface Props {
  message: string;
  realTimeOnRender: Date;
}

export const TimeDisplayFastTime: React.FC<Props> = ({ message = 'Time' }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const realTimeOnRender = useRef(new Date());
  const [speedIndex, setSpeedIndex] = useState(1000);
  const [time, setTime] = useState(realTimeOnRender.current);
  const [elapsedTime, setElapsedTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    console.log('Start Timer');
    const timer = setInterval(() => {
      const startDate = realTimeOnRender.current;
      const endDate = new Date();
      const elapsedTime = endDate.getTime() - startDate.getTime();
      const speedUpElapsedTime = elapsedTime * speedIndex;

      const timeElpased = convertMiliseconds(speedUpElapsedTime);
      setElapsedTime(timeElpased);
      const newTime = new Date(realTimeOnRender.current.getTime() + elapsedTime * speedIndex);

      setTime(newTime);
    }, 1000);
    return function cleanup() {
      console.log('stopTimer');
      clearInterval(timer);
    };
  }, [speedIndex, realTimeOnRender]);

  const timeDisplay = useMemo(() => {
    return (
      <>
        <Typography variant="body2">{`speed: ${speedIndex}x `}</Typography>
        <Typography variant="h3">{time.toLocaleString('en-US', dateOptions)}</Typography>
        <Typography variant="caption">Time Past</Typography>
        <Stack spacing={1} direction="row">
          <Typography variant="caption">{`days: ${elapsedTime.d}`}</Typography>
          <Typography variant="caption">{`hours: ${elapsedTime.h}`}</Typography>
          <Typography variant="caption">{`minutes: ${elapsedTime.m}`}</Typography>
          <Typography variant="caption">{`seconds: ${elapsedTime.s}`}</Typography>
        </Stack>
      </>
    );
  }, [time, realTimeOnRender]);

  return (
    <Box>
      <Typography variant="body2">{message}</Typography>

      <Stack direction={'column'} justifyContent="space-between">
        <Typography variant="body2">{'started at:'}</Typography>
        <Typography variant="h6">
          {realTimeOnRender.current.toLocaleString('en-US', dateOptions)}
        </Typography>
        {timeDisplay}
      </Stack>
    </Box>
  );
};

function convertMiliseconds(miliseconds: number) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = Math.floor(miliseconds / 1000);
  total_minutes = Math.floor(total_seconds / 60);
  total_hours = Math.floor(total_minutes / 60);
  days = Math.floor(total_hours / 24);

  seconds = total_seconds % 60;
  minutes = total_minutes % 60;
  hours = total_hours % 24;

  return { d: days, h: hours, m: minutes, s: seconds };
}
