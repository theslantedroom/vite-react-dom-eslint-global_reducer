import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Slider } from '@mui/material';
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
}
export const CardBasic: React.FC<Props> = ({
  name = undefined,
  description = undefined,
  dateCreated = undefined,
  timeRate = 1,
  counterSpeedMs = 100,
  minTimeRate = -10,
  maxTimeRate = 10,
  rateSliderStep = 1,
  rateReturn = -1,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs
  );

  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Paper
      sx={{
        minWidth: '150px',
        p: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        ...centerFlexbox,
      }}
    >
      <Stack spacing={1} direction="column">
        <Box sx={centerFlexbox}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="caption">Born: {timeData.dateCreated}</Typography>
          <Typography variant="caption">{description || '-'}</Typography>
        </Box>

        {/* REAL TIME CARD HAS EXISTED */}

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {timeData.realTimePast.breakdown.y !== 0 && (
            <Typography variant="caption">years: {timeData.realTimePast.breakdown.y}</Typography>
          )}
          {timeData.realTimePast.breakdown.d !== 0 && (
            <Typography variant="caption">days: {timeData.realTimePast.breakdown.d}</Typography>
          )}
          {timeData.realTimePast.breakdown.h !== 0 && (
            <Typography variant="caption">hours: {timeData.realTimePast.breakdown.h}</Typography>
          )}
          {(timeData.realTimePast.breakdown.m !== 0 || timeData.realTimePast.breakdown.s > 0) && (
            <Typography variant="caption">min: {timeData.realTimePast.breakdown.m}</Typography>
          )}
          {(timeData.realTimePast.breakdown.s !== 0 || timeData.realTimePast.breakdown.m > 0) && (
            <Typography variant="caption">sec: {timeData.realTimePast.breakdown.s}</Typography>
          )}
        </Stack>

        <Typography variant="caption">{timeData.calculatedDate}</Typography>

        <Typography variant="caption">{`${timeData.ageFormatted} / rate: x${rate}`} </Typography>
      </Stack>
    </Paper>
  );
};
