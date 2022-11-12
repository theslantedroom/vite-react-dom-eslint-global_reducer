import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { useCardTimeData } from '../hooks/useCardTimeData';

export interface Props {
  name?: String;
  description?: String;
  dateCreated?: Date;
  timeRate?: number;
  creates?: string;
  counterSpeedMs?: number;
  minTimeRate?: number;
  maxTimeRate?: number;
  rateSliderStep?: number;
  rateReturn?: number;
  lifeDuration?: number;
  addQuarks?: any;
  duplicate?: any;
  destroy?: any;
}
export const CardDead: React.FC<Props> = ({
  name = undefined,
  description = undefined,
  dateCreated = undefined,
  timeRate = 1,
  counterSpeedMs = 100,
  minTimeRate = -10,
  maxTimeRate = 10,
  rateSliderStep = 1,
  rateReturn = -1,
  lifeDuration = 100000,
  addQuarks = () => null,
  duplicate = () => null,
  destroy = () => null,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs,
    lifeDuration
  );

  const { isInvalidDate, msPassed, timeLivedMs } = timeData;

  useEffect(() => {
    if (!isAlive) {
      // set timerate 1 for dead cards
      const completedLiveTimeRate = 1;
      addQuarks(dateCreated, lifeDuration, completedLiveTimeRate);
      return;
    }
  }, [msPassed, timeData.isAlive]);

  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const isAlive = timeData.isAlive;
  const handleOnDeath = () => {
    console.log('card died:', name);
  };

  useEffect(() => {
    if (!isAlive) handleOnDeath();
  }, [isAlive]);
  return (
    <Paper
      sx={{
        minWidth: isAlive ? '250px' : '50px',
        p: 2,
        m: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
    >
      <Box sx={centerFlexbox}>
        {/* Header */}
        <Typography variant="h4">{name}</Typography>
        {isAlive ? (
          <Typography variant="body1">
            "
            <TypeOut
              words={description}
              typeSpeed={50}
              rewindSpeed={1}
              pauseSpeed={2000}
              Node="span"
            />
            "
          </Typography>
        ) : null}
        {isAlive ? (
          <Typography variant="caption">{isInvalidDate ? '' : timeData.calculatedDate}</Typography>
        ) : (
          <Typography variant="caption">{''}</Typography>
        )}
      </Box>

      <Box sx={centerFlexbox}>
        <Typography variant="caption">{timeData.dateCreated}</Typography>
      </Box>
      {/* footer */}
      {!isAlive ? (
        <Box sx={centerFlexbox}>
          <Typography variant="h1">LOST</Typography>
          <Typography variant="caption">{`time rate: ${timeData.timeRate}x`} </Typography>
        </Box>
      ) : null}
      <Stack spacing={1} direction="row" justifyContent={'center'} padding={1}>
        <Box sx={centerFlexbox}>
          <Typography variant="caption">
            {isAlive ? 'Life Span' : 'Survived'}
            {timeData.lifeDuration.dateString}
          </Typography>
          <Typography variant="caption">{timeData.lifeDuration.timeString}</Typography>
        </Box>
      </Stack>
      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="caption">
          quark made: {numberWithCommas(lifeDuration / 1000)}
        </Typography>
      </Stack>
      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={duplicate} variant="outlined">
          Replicate
        </Button>
        <Button onClick={destroy} variant="outlined">
          Destroy
        </Button>
      </Stack>
    </Paper>
  );
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
