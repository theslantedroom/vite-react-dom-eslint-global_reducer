import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Slider, Divider } from '@mui/material';
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
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const dateDied = 'n/a';

  const isAlive = timeData.isAlive;

  return (
    <Paper
      sx={{
        minWidth: '350px',
        p: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
    >
      <Box sx={centerFlexbox}>
        {/* Header */}

        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6">{description || '-'}</Typography>

        <Typography variant="caption">{timeData.calculatedDate}</Typography>
      </Box>

      {/* Split pillars */}

      <Stack spacing={1} direction="row" justifyContent={'center'} padding={1}>
        {/* pillar 1 */}
        <Stack spacing={1} direction="column" padding={1}>
          <>
            <Box sx={centerFlexbox}>
              <Typography variant="h6">{isAlive ? 'Time Alive' : `Time since birth`}</Typography>
              <Typography variant="caption">{timeData.timeLived.dateString}</Typography>
              <Typography variant="caption">{timeData.timeLived.timeString}</Typography>
            </Box>
          </>
        </Stack>
        {/* pillar 2 */}
        <Stack spacing={1} direction="column" padding={1}>
          <>
            <Box sx={centerFlexbox}>
              <Typography variant="h6">{isAlive ? 'Life Span' : 'Survived'}</Typography>
              <Typography variant="caption">{timeData.lifeDuration.dateString}</Typography>
              <Typography variant="caption">{timeData.lifeDuration.timeString}</Typography>
            </Box>
          </>
        </Stack>
      </Stack>
      {/* footer */}

      {!isAlive ? (
        <Box sx={centerFlexbox}>
          <Typography variant="h1">DEAD</Typography>
        </Box>
      ) : null}

      <Box sx={centerFlexbox}>
        <Typography variant="body1">Born</Typography>
        <Typography variant="caption">{timeData.dateCreated}</Typography>
      </Box>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Box sx={centerFlexbox}>
          <Typography variant="caption">True Age:</Typography>
          <Typography variant="caption">{timeData.realTimePast.string}</Typography>
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <Typography variant="body2">{`rate: ${rate}x`} </Typography>
        <Typography sx={{ fontSize: '12px' }}>{`${timeData.ageFormatted}`} </Typography>
      </Stack>
    </Paper>
  );
};
