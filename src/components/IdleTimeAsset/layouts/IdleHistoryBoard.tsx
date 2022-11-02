import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Button } from '@mui/material';
import { genTimeTarget } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import { useCardTimeData } from '../hooks/useCardTimeData';
import { subject0 } from '../util/generateCard';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
export interface Props {
  cards?: any[];
  timeTargets?: any[];
}
export const IdleHistoryBoard: React.FC<Props> = ({ cards = [], timeTargets = [] }) => {
  const [localCards, setLocalCards] = useState<any>(cards);

  const spawnCards = (cards: any[]) => {
    setLocalCards((prev: any) => [...prev, ...cards]);
  };

  const start = () => {
    const cards = [subject0];
    spawnCards([...cards]);
  };
  useEffect(() => {
    start();
  }, []);

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack spacing={1} direction="column">
        <Typography variant="h4">{`Time Travelers`}</Typography>

        <Stack spacing={1} direction="row" justifyContent={'center'}>
          {localCards.length === 0 && <Button onClick={start}>Start</Button>}
          {localCards.map((card: any, i: number) => {
            const {
              name,
              description,
              lifeDuration,
              dateCreated,
              timeRate,
              creates,
              counterSpeedMs,
              minTimeRate,
              maxTimeRate,
              rateSliderStep,
              rateReturn,
              completed,
            } = card;

            return (
              <CardBasic
                key={name + i}
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
              />
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
};

interface XProps {
  timeTargetCard: any;
  isComplete: boolean;
}
const TimeTarget: React.FC<XProps> = ({ timeTargetCard, isComplete }) => {
  const { name, targetTime, dateTargetCreated } = timeTargetCard;
  const dateTargetTime = new Date(targetTime);
  const dateCreatedTime = new Date(dateTargetCreated);
  const isInPast = dateTargetTime < new Date();

  const targetTimeMemo = useMemo(() => {
    return dateTargetTime.toLocaleDateString('en-US', dateOptions);
  }, [dateTargetTime]);

  const createdTimeMemo = useMemo(() => {
    return dateCreatedTime.toLocaleDateString('en-US', dateOptions);
  }, [dateCreatedTime]);

  return (
    <Paper
      sx={{
        minWidth: '150px',
        p: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">{name}</Typography>
      {!isComplete && (
        <Typography variant="caption">
          {isInPast ? 'back in time to' : 'forward in time to'}
        </Typography>
      )}
      <Typography variant="caption">{targetTimeMemo}</Typography>
      <Typography variant="caption">created: {createdTimeMemo}</Typography>

      {isComplete && (
        <Typography sx={{ color: isComplete ? 'green' : 'red' }} variant="body2">
          {isComplete ? 'complete' : `in progress`}
        </Typography>
      )}
    </Paper>
  );
};
