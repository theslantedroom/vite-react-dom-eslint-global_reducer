import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { convertMS, useCardTimeData } from '../hooks/useCardTimeData';

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
  destroyCard?: any;
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
  destroyCard = () => null,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs,
    lifeDuration
  );

  const { isInvalidDate, msPassed } = timeData;

  // useEffect(() => {
  //   // set timerate 1 for dead cards
  //   console.log('dead add');
  //   const completedLiveTimeRate = 1;
  //   addQuarks(dateCreated, lifeDuration, completedLiveTimeRate);
  // }, [msPassed, timeData.isAlive]);

  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  useEffect(() => {
    const completedLiveTimeRate = 1;
    addQuarks(dateCreated, lifeDuration, completedLiveTimeRate);
    console.log('xxx');
    destroyCard();
  }, []);

  return (
    <Paper
      sx={{
        minWidth: '50px',
        p: 2,
        m: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
    >
      <Box sx={centerFlexbox}>
        {/* Header */}
        <Typography variant="h4">{name}</Typography>

        <Typography variant="caption">{''}</Typography>
      </Box>

      <Box sx={centerFlexbox}>
        <Typography variant="caption">{timeData.dateCreated}</Typography>
      </Box>
      {/* footer */}
      <Box sx={centerFlexbox}>
        <Typography variant="h1">Arrived</Typography>
        <Typography variant="caption">{`time rate: ${timeData.timeRate}x`} </Typography>
      </Box>
      <Stack spacing={1} direction="row" justifyContent={'center'} padding={1}>
        <Box sx={centerFlexbox}>
          <Typography variant="caption">{timeData.lifeDuration.dateString}</Typography>
          <Typography variant="caption">{timeData.lifeDuration.timeString}</Typography>
        </Box>
      </Stack>
      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="caption">
          probed: {convertMS(lifeDuration).dateString}
          {convertMS(lifeDuration).timeString}
        </Typography>
      </Stack>
      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={duplicate} variant="outlined">
          Replicate
        </Button>
        {/* <Button onClick={destroy} variant="outlined">
          Destroy
        </Button> */}
      </Stack>
    </Paper>
  );
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
