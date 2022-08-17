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

  useEffect(() => {
    console.log('Start Timer');
    const timer = setInterval(() => {
      const startDate = realTimeOnRender.current;
      const endDate = new Date();
      var elapsedTime = endDate.getTime() - startDate.getTime();

      const newTime = new Date(realTimeOnRender.current.getTime() + elapsedTime * speedIndex);

      setTime(newTime);
    }, 1000);
    return function cleanup() {
      console.log('stopTimer');
      clearInterval(timer);
    };
  }, [speedIndex, realTimeOnRender]);

  const timeDisplay = useMemo(() => {
    console.log('time', time);
    return <Typography variant="h3">{time.toLocaleString('en-US', dateOptions)}</Typography>;
  }, [time, realTimeOnRender]);

  return (
    <Box>
      <Typography variant="body2">{message}</Typography>

      <Stack direction={'column'} justifyContent="space-between">
        <Typography variant="body2">{'started at:'}</Typography>

        <Typography variant="h6">
          {realTimeOnRender.current.toLocaleString('en-US', dateOptions)}
        </Typography>
        <Typography variant="body2">{'now:'}</Typography>
        {timeDisplay}
      </Stack>
    </Box>
  );
};
