import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Slider } from '@mui/material';
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
  name?: String;
  cards?: any[];
  timeTargets?: any[];
}
export const IdleTimeBoard: React.FC<Props> = ({
  name = 'IdleTimeBoard',
  cards = [],
  timeTargets = [
    genTimeTarget(),
    {
      name: 'Send a traveler',
      targetTime: 1660165481701,
      isVisited: false,
    },
    {
      name: 'Send a traveler',
      targetTime: 1669165481701,
      isVisited: false,
    },
  ],
}) => {
  timeTargets.forEach((timeTarget, i) => {
    const { targetTime } = timeTarget;
    cards.forEach((card) => {
      const { timeData, rate, setRate } = useCardTimeData(
        card.rateReturn,
        card.timeRate,
        card.dateCreated,
        card.counterSpeedMs
      );
      timeData;
      const isComplete = false;
      const isTravelToPast = card.timeRate < 0;
      const isTargetInPast = targetTime < Date.now();
      const travellerCurrentTime = isTravelToPast
        ? timeData.pastDate.getTime()
        : timeData.futureDate.getTime();

      if (isTargetInPast && travellerCurrentTime < targetTime) {
        timeTargets[i].isVisited = true;
      }

      if (!isTargetInPast && travellerCurrentTime > targetTime) {
        timeTargets[i].isVisited = true;
      }
    });

    return null;
  });

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

        {timeTargets.map((target, i) => {
          return <TimeTarget key={target.name + i} timeTargetCard={target} />;
        })}

        {/* <ShowCardsRaw cards={cards} /> */}
        <Stack spacing={1} direction="row">
          {cards.map((card, i) => {
            const {
              name,
              description,
              dateCreated,
              timeRate,
              creates,
              counterSpeedMs,
              minTimeRate,
              maxTimeRate,
              rateSliderStep,
              rateReturn,
            } = card;
            return (
              <CardBasic
                key={name + i}
                name={name}
                description={description}
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
}
const TimeTarget: React.FC<XProps> = ({ timeTargetCard }) => {
  const { name, targetTime, isVisited } = timeTargetCard;
  const date = new Date(targetTime);
  const isInPast = date < new Date();

  const targetTimeMemo = useMemo(() => {
    return date.toLocaleDateString('en-US', dateOptions);
  }, [targetTime, date]);

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
      <Typography variant="caption">
        {isInPast ? 'back in time to' : 'forward in time to'}
      </Typography>
      <Typography variant="caption">{targetTimeMemo}</Typography>
      <Typography sx={{ color: isVisited ? 'green' : 'red' }} variant="body2">
        {isVisited ? 'complete' : `in progress`}
      </Typography>
    </Paper>
  );
};
