import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { genTimeTarget } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import { useCardTimeData } from '../hooks/useCardTimeData';
import { subject0, subjectLongDead, baseTime } from '../util/generateCard';

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
  const [quarks, setQuarks] = useState(0);
  const [gameData, setGameData] = useState({});
  const spawnCards = (cards: any[]) => {
    setLocalCards((prev: any) => [...prev, ...cards]);
  };

  const start = () => {
    const cards = [baseTime];
    spawnCards([...cards]);
  };
  useEffect(() => {
    start();
  }, []);

  const addQuarks = useCallback(
    (dateCreated: Date, amount: number) => {
      setGameData((prev) => ({ ...prev, [dateCreated.getTime()]: amount / 1000 }));
    },
    [setGameData]
  );

  const duplicateCard = (card: any, i: number) => {
    console.log('duplicateCard', card);

    let newCard = {
      ...card,
    };
    newCard.dateCreated = new Date();

    const cards = [newCard];
    spawnCards([...cards]);
  };

  useEffect(() => {
    const values = Object.values(gameData);
    const sum: any = values.reduce((accumulator: any, value: any) => {
      return accumulator + value;
    }, 0);
    setQuarks(Math.round(sum));
  }, [gameData]);
  return (
    <Stack spacing={1} direction="column">
      <Typography variant="h4">{`Time Probe Replicator`}</Typography>
      <Typography variant="h4">{quarks}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              addQuarks={addQuarks}
              duplicate={() => duplicateCard(card, i)}
            />
          );
        })}
      </Box>
      <Divider sx={{ width: '100%', my: '10px' }} />

      {/* {JSON.stringify(gameData, null, '\t')} */}
    </Stack>
  );
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
