import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { genTimeTarget } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import { useCardTimeData } from '../hooks/useCardTimeData';
import { subject0, subjectLongDead, genTimeProbe } from '../util/generateCard';

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
  const [localCards, setLocalCards] = useState<any>([]);
  const [quarks, setQuarks] = useState(0);
  const [darkQuarks, setDarkQuarks] = useState(0);
  const [gameLog, setGameLog] = useState(['waiting.....']);
  const [cardCapacity, setCardCapacity] = useState(4);
  const displayQuarks = quarks - darkQuarks;
  const [gameData, setGameData] = useState<any>({});
  const spawnCards = (cards: any[]) => {
    setLocalCards((prev: any) => [...prev, ...cards]);
  };

  const start = () => {
    addGameLog(`initializing....`);

    const cards = [genTimeProbe()];
    spawnCards([...cards]);
  };

  // useEffect(() => {
  //   start();
  // }, []);

  const addQuarks = useCallback(
    (dateCreated: Date, amount: number) => {
      setGameData((prev: any) => ({ ...prev, [dateCreated.getTime()]: amount / 1000 }));
    },
    [setGameData]
  );
  const addGameLog = useCallback(
    (text: string) => {
      setGameLog((prev) => {
        return [...prev, text];
      });
    },
    [gameLog]
  );
  const purchaseForQuarks = (cost: number) => {
    if (displayQuarks < cost) return false;
    addGameLog(`-${cost} quarks`);
    setDarkQuarks((prev) => prev + cost);
    return true;
  };

  const replicateCard = (card: any, i: number) => {
    const isAtProbeMax = localCards.length >= cardCapacity;

    if (isAtProbeMax) {
      addGameLog(`error... failed to replicate... maximum ${cardCapacity}/${cardCapacity} probes`);
      return;
    }
    const cardCost = 1;
    const canAfford = purchaseForQuarks(cardCost);
    if (canAfford) {
      addGameLog(`job complete.... replicated ${card.name}`);
      let newCard = {
        ...card,
      };
      newCard.dateCreated = new Date();
      const cards = [newCard];
      spawnCards([...cards]);
    } else {
      addGameLog(`insufficient quarks - required: ${cardCost}`);
    }
  };

  const destroyCard = (dateCreated: Date) => {
    if (localCards.length === 1) {
      addGameLog(`error... destroying last probe violates Ai directive`);

      return;
    }
    const card = localCards.filter((obj: any) => {
      return obj.dateCreated === dateCreated;
    })[0];
    addGameLog(`destroyed: ${card.name}`);

    const afterLocalCards = localCards.filter((obj: any) => {
      return obj.dateCreated != dateCreated;
    });
    setLocalCards((prev: any) => [...afterLocalCards]);
  };

  const displayGameLog = useMemo(() => {
    return gameLog.reverse().map((log, i) => {
      const isTopLog = i < 3;
      return (
        <Box key={log + i} sx={centerFlexbox}>
          <Typography
            variant={isTopLog ? 'body1' : 'caption'}
            sx={{ color: isTopLog ? 'lightgreen' : 'inherit' }}
          >
            {log}
          </Typography>
        </Box>
      );
    });
  }, [gameLog]);

  // update gameData
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
      <Typography variant="h6">
        {localCards.length}/{cardCapacity}
      </Typography>
      <Typography variant="h4">{displayQuarks}</Typography>

      <Divider sx={{ width: '100%', my: '10px' }} />
      <Box sx={{ width: '100%', textAlign: 'center', height: '75px', overflow: 'auto' }}>
        {gameLog.length > 0 ? displayGameLog : null}
      </Box>
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
              duplicate={() => replicateCard(card, i)}
              destroy={() => destroyCard(card.dateCreated)}
            />
          );
        })}
      </Box>

      {/* {JSON.stringify(gameData, null, '\t')} */}
    </Stack>
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
