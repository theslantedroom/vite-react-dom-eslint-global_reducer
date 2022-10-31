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
  lifeDuration?: number;
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
  lifeDuration = 100000,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs,
    lifeDuration
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
      <Stack spacing={1} direction="column" padding={1}>
        <Box sx={centerFlexbox}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="caption">{timeData.calculatedDate}</Typography>
        </Box>

        <Box sx={centerFlexbox}>
          <Typography variant="h6">Born</Typography>
          <Typography variant="caption">{timeData.dateCreated}</Typography>
        </Box>

        <Box sx={centerFlexbox}>
          <Typography variant="h6">Life Expectancy</Typography>
          <Typography variant="caption">{timeData.lifeDuration.string}</Typography>
        </Box>

        <Box sx={centerFlexbox}>
          <Typography variant="h6">Time Alive</Typography>
          <Typography variant="caption">{timeData.timeLived.string}</Typography>
        </Box>

        {/* REAL TIME CARD HAS EXISTED */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Box sx={centerFlexbox}>
            <Typography variant="h6">True Age:</Typography>
            <Typography variant="caption">{timeData.realTimePast.string}</Typography>
          </Box>
        </Stack>

        <Typography variant="caption">{description || '-'}</Typography>
      </Stack>
      <Typography variant="body2">{`rate: ${rate}x`} </Typography>
      <Typography sx={{ fontSize: '12px' }}>{`${timeData.ageFormatted}`} </Typography>{' '}
      <Typography sx={{ fontSize: '12px' }}>{`${timeData.isAlive}`} </Typography>
    </Paper>
  );
};
