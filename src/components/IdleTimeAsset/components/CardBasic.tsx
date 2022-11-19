import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';
import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UpdateIcon from '@mui/icons-material/Update';

import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { calcReplicateCost } from '../layouts/IdleHistoryBoard';
import { CardDead } from './CardDead';
// hooks
import { useCardTimeData, convertMS } from '../hooks/useCardTimeData';

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
  selectCard?: any;
  selectedCard?: any;
  gameOptions: any;
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
  selectCard = () => null,
  selectedCard = undefined,
  gameOptions,
  creates,
}) => {
  const { timeData, rate, setRate } = useCardTimeData(
    rateReturn,
    timeRate,
    dateCreated,
    counterSpeedMs,
    lifeDuration
  );
  const isAlive = timeData.isAlive;

  const { isInvalidDate, msPassed, willDieBeforeFirstFrame } = timeData;
  const replicateCost = convertMS(calcReplicateCost(lifeDuration, timeRate));

  // add quarks to charge while alive
  useEffect(() => {
    if (!isAlive || willDieBeforeFirstFrame) {
      addQuarks(dateCreated, lifeDuration, 1);
      return;
    }

    addQuarks(dateCreated, msPassed, timeRate);
  }, [msPassed]);

  //select this card on render
  useEffect(() => {
    selectCard();
  }, []);

  const isSelected = selectedCard?.dateCreated === dateCreated;

  return (
    <Paper
      sx={{
        minWidth: '350px',
        p: 1,
        m: 1,
        borderRadius: '15px',
        border: isSelected ? '2px solid green' : 'initial',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }}
    >
      {willDieBeforeFirstFrame ? 'willDieBeforeFirstFrame' : ''}
      <Box sx={centerFlexbox}>
        {/* Header */}
        <Typography variant="h4">{name}</Typography>
      </Box>
      {isAlive ? (
        <Box sx={{ width: '100%' }}>
          <ProgressBar
            value={timeData.timeLived.ms}
            max={timeData.lifeDuration.ms}
            tooltip={'probe active'}
            message={isInvalidDate ? '' : timeData.calculatedDate}
          />
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <ProgressBar
            value={timeData.timeLived.ms}
            max={timeData.lifeDuration.ms}
            tooltip={'probe deactivated'}
            message={`destination time reached`}
          />
        </Box>
      )}

      {/* Split pillars */}

      <Stack spacing={1} direction="row" justifyContent={'center'} padding={1}>
        {/* pillar 1 */}
        <Stack spacing={1} direction="column" padding={1}>
          <Box sx={centerFlexbox}>
            <Typography variant="h6">Traveled</Typography>
            <Typography variant="caption">
              {!isAlive ? timeData.lifeDuration.dateString : timeData.timeLived.dateString}
            </Typography>
            <Typography variant="caption">
              {!isAlive ? timeData.lifeDuration.timeString : timeData.timeLived.timeString}
            </Typography>
          </Box>
        </Stack>
        {/* pillar 2 */}
        <Stack spacing={1} direction="column" padding={1}>
          <Box sx={centerFlexbox}>
            <Typography variant="h6">Max Travel</Typography>
            <Typography variant="caption">{timeData.lifeDuration.dateString}</Typography>
            <Typography variant="caption">{timeData.lifeDuration.timeString}</Typography>
          </Box>
        </Stack>
      </Stack>
      {/* footer */}

      <Box sx={centerFlexbox}>
        <Typography variant="caption">Created: {timeData.dateCreated}</Typography>
        <Typography variant="h4">{`time rate: ${timeData.timeRate}x`} </Typography>
      </Box>

      <Stack spacing={0.5} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {isSelected ? (
          <Stack>
            {gameOptions.isCloningFree ? (
              <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
                Clone with Mutator
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
                Clone for <ElectricBoltIcon sx={{ position: 'relative', top: '5px' }} />
                {replicateCost.dateString}
                {replicateCost.timeString}
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                sx={{ mx: 0.5 }}
                startIcon={<FastForwardIcon />}
                endIcon={<TrendingUpIcon />}
                onClick={() => duplicate('isMutateTimeRate')}
                color="success"
                variant="contained"
              >
                Time Rate
              </Button>
              <Button
                startIcon={<UpdateIcon />}
                endIcon={<TrendingUpIcon />}
                sx={{ mx: 0.5 }}
                onClick={() => duplicate('isMutateDurability')}
                color="success"
                variant="contained"
              >
                Max Travel
              </Button>
            </Box>
          </Stack>
        ) : (
          <Button
            onClick={selectCard}
            sx={{
              '.MuiButton-root': {
                backgroundColor: 'green',
              },
            }}
            variant="outlined"
          >
            Select Probe
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const centerFlexbox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};
