import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { useCardTimeData, convertMS } from '../hooks/useCardTimeData';
import { CardDead } from './CardDead';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { calcReplicateCost } from '../layouts/IdleHistoryBoard';

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
  addQuarks = () => null,
  duplicate = () => null,
  destroyCard = () => null,
  creates,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs,
    lifeDuration
  );

  const { isInvalidDate, msPassed, timeLivedMs } = timeData;
  const replicateCost = convertMS(calcReplicateCost(lifeDuration, timeRate));
  useEffect(() => {
    if (!isAlive) {
      return;
    }
    addQuarks(dateCreated, msPassed, timeRate);
  }, [msPassed, timeData.isAlive]);
  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const isAlive = timeData.isAlive;
  if (!isAlive)
    return (
      <CardDead
        name={name}
        description={description}
        lifeDuration={lifeDuration}
        dateCreated={dateCreated}
        timeRate={timeRate}
        creates={creates}
        counterSpeedMs={counterSpeedMs}
        minTimeRate={minTimeRate}
        maxTimeRate={maxTimeRate}
        rateSliderStep={rateSliderStep}
        rateReturn={rateReturn}
        addQuarks={addQuarks}
        duplicate={duplicate}
        destroyCard={destroyCard}
      />
    );
  return (
    <Paper
      sx={{
        minWidth: '350px',
        p: 1,
        m: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
    >
      <Box sx={centerFlexbox}>
        {/* Header */}
        <Typography variant="h4">{name}</Typography>
        <Typography variant="caption">{isInvalidDate ? '' : timeData.calculatedDate}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ProgressBar
          value={timeData.timeLived.ms}
          max={timeData.lifeDuration.ms}
          tooltip={'probe active'}
          message={
            <TypeOut
              words={description}
              typeSpeed={50}
              rewindSpeed={1}
              pauseSpeed={2000}
              Node="span"
            />
          }
        />
      </Box>
      {/* Split pillars */}

      <Stack spacing={1} direction="row" justifyContent={'center'} padding={1}>
        {/* pillar 1 */}
        <Stack spacing={1} direction="column" padding={1}>
          <Box sx={centerFlexbox}>
            <Typography variant="h6">Traveled</Typography>
            <Typography variant="caption">{timeData.timeLived.dateString}</Typography>
            <Typography variant="caption">{timeData.timeLived.timeString}</Typography>
          </Box>
        </Stack>
        {/* pillar 2 */}
        <Stack spacing={1} direction="column" padding={1}>
          <Box sx={centerFlexbox}>
            <Typography variant="h6">Capacity</Typography>
            <Typography variant="caption">{timeData.lifeDuration.dateString}</Typography>
            <Typography variant="caption">{timeData.lifeDuration.timeString}</Typography>
          </Box>
        </Stack>
      </Stack>
      {/* footer */}

      <Box sx={centerFlexbox}>
        <Typography variant="caption">Card's Birth: {timeData.dateCreated}</Typography>
        <Typography variant="caption">Card's Age: {timeData.realTimePast.string}</Typography>
        <Typography variant="h2">{`time rate: ${timeData.timeRate}x`} </Typography>
        <Typography sx={{ fontSize: '12px' }}>{`${timeData.ageFormatted}`} </Typography>
      </Box>
      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={duplicate} variant="outlined">
          Replicate
          {replicateCost.dateString}
          {replicateCost.timeString}
        </Button>
        {/* <Button onClick={() => destroy(dateCreated)} variant="outlined">
          Abandon
        </Button> */}
      </Stack>
    </Paper>
  );
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
