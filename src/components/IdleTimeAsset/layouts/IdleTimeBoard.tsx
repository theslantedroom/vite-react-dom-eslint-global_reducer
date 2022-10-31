import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Button } from '@mui/material';
import { genTimeTarget } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import { useCardTimeData } from '../hooks/useCardTimeData';

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
export const IdleTimeBoard: React.FC<Props> = ({ cards = [], timeTargets = [] }) => {
  const [localCards, setLocalCards] = useState<any>(cards);
  const [localTimeTargets, setLocalTimeTargets] = useState<any>(timeTargets);

  const [completedCardIndexes, setCompletedCardIndexes] = useState<Set<number>>(new Set());
  useEffect(() => {
    const interval = setInterval(() => {
      //Process Targets
      localTimeTargets.forEach((timeTarget: any, i: number) => {
        //get out if target already completed
        if (completedCardIndexes.has(i)) return;
        const { targetTime, name: targetName, dateTargetCreated } = timeTarget;
        console.log('Wait for ', targetName);

        localCards.forEach((card: any, cardIndex: number) => {
          const { timeRate, name } = card;
          const isTravelForward = timeRate > 0;
          const nowDate = new Date();
          const msPassed = nowDate.getTime();
          const totalAccumulatedInt = msPassed * card.timeRate;

          const futureDate = new Date(nowDate.getTime() + totalAccumulatedInt - msPassed);
          const pastDate = new Date(nowDate.getTime() - msPassed + totalAccumulatedInt);
          console.log('isTravelForward', isTravelForward);
          const isTravelToPast = card.timeRate < 0;
          const isTargetInPast = targetTime < Date.now();

          // if (isTargetInPast && isTravelForward) {
          //   console.log('xxx');
          //   return;
          // }
          // if (!isTargetInPast && !isTravelForward) {
          //   console.log('yyy');
          //   return;
          // }
          const travelerCurrentTime = isTravelToPast ? pastDate.getTime() : futureDate.getTime();
          if (!isTravelForward && !isTargetInPast) {
            console.log('hit past target', targetName);
            setCompletedCardIndexes((p) => new Set([...p, i]));
          }

          if (isTravelForward && isTargetInPast) {
            console.log('hit future target', targetName);
            setCompletedCardIndexes((p) => new Set([...p, i]));
          }
        });

        return;
      });
    }, 200);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [localCards, localTimeTargets, completedCardIndexes]);

  useEffect(() => {
    console.log('completedCardIndexes', completedCardIndexes);
  }, [completedCardIndexes]);

  const spawnScientist = () => {
    const scientist = {
      name: 'You',
      description: 'Passes through time at a normal rate.',
      dateCreated: new Date(),
      timeRate: 1,
      counterSpeedMs: 100,
    };
    setLocalCards((prev: any) => [...prev, scientist]);
  };

  const spawnTarget = () => {
    const futureTarget = {
      name: 'Hop to the future',
      targetTime: Date.now() + 5000,
      dateTargetCreated: Date.now(),
    };

    const dayFutureTarget = {
      name: 'Hop to the future',
      targetTime: Date.now() + 599000,
      dateTargetCreated: Date.now(),
    };
    const pastTarget = {
      name: 'Hop to the Past',
      targetTime: Date.now() - 529000,
      dateTargetCreated: Date.now(),
    };
    setLocalTimeTargets((prev: any) => [...prev, futureTarget, dayFutureTarget, pastTarget]);
  };

  const start = () => {
    spawnTarget();
    spawnScientist();
  };

  if (!completedCardIndexes) return null;
  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={1} direction="column">
        {/* <Typography variant="h4">{`Time Travelers`}</Typography> */}

        {localTimeTargets.map((target: any, i: number) => {
          const isComplete = completedCardIndexes.has(i);
          return (
            <TimeTarget key={target.name + i} timeTargetCard={target} isComplete={isComplete} />
          );
        })}

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
