import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { genTimeTarget } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import { convertMS } from '../hooks/useCardTimeData';
import { subject0, subjectLongDead, genTimeProbe } from '../util/generateCard';
import { useLocalstorageState } from 'rooks';
import { useSaveObjectLocalStorage } from '../hooks/useSaveObjectLocalStorage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
  const [aliveProbesCount, setAliveProbesCount] = useState(0);
  const [deadProbesCount, setDeadProbesCount] = useState(0);
  const [darkQuarks, setDarkQuarks] = useState(0);
  const [jumpedDistance, setJumpedDistance] = useState(0);
  const [gameLog, setGameLog] = useState(['waiting.....']);
  const [cardCapacity, setCardCapacity] = useState(3);
  const displayQuarks = quarks - darkQuarks;
  const [gameData, setGameData] = useState<any>({});
  const {} = useSaveObjectLocalStorage();
  const spawnCards = (cards: any[]) => {
    setLocalCards((prev: any) => [...prev, ...cards]);
  };

  useEffect(() => {
    setAliveProbesCount(localCards.length);
  }, [localCards.length]);

  const [isMutateTimeRate, setIsMutateTimeRate] = useState(true);
  const [isMutateLifeSpan, setIsMutateLifeSpan] = useState(false);

  const start = () => {
    addGameLog(`Traveling an normal speed.`);
    addGameLog(`time travel probe activated....`);
    addGameLog(`initializing....`);

    const cards = [genTimeProbe()];
    spawnCards([...cards]);
  };

  useEffect(() => {
    start();
  }, []);

  const addQuarks = useCallback(
    (dateCreated: Date, amount: number, timeRate: number) => {
      setGameData((prev: any) => ({
        ...prev,
        [dateCreated.getTime()]: amount * timeRate,
      }));
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
    addGameLog(`-${convertMS(cost).dateString}${convertMS(cost).timeString}`);
    setDarkQuarks((prev) => prev + cost);
    return true;
  };

  const deadProbes = localCards.filter((obj: any) => {
    if (obj.isDestroyed === true) {
      return true;
    }
    return false;
  }).length;

  const replicateCard = (card: any, i: number) => {
    const isAtProbeMax = aliveProbesCount - deadProbesCount >= cardCapacity;
    if (isAtProbeMax) {
      addGameLog(`error... failed to replicate... maximum ${cardCapacity}/${cardCapacity} probes`);
      return;
    }

    const cardCost = calcReplicateCost(card.lifeDuration, card.timeRate);
    const canAfford = purchaseForQuarks(cardCost);
    if (canAfford) {
      addGameLog(`job complete.... replicated ${card.name}`);
      let newCard = {
        ...card,
      };
      newCard.dateCreated = new Date();
      newCard.isDestroyed = false;
      if (isMutateTimeRate) {
        const mutateScale = 1 + Math.random();
        const newTimeRate = Math.round(card.timeRate * mutateScale * 10) / 10;
        addGameLog(`mutating time rate.. ${card.name} ${card.timeRate}>${newTimeRate}`);
        newCard.timeRate = newTimeRate;
      }
      const cards = [newCard];
      spawnCards([...cards]);
    } else {
      addGameLog(
        `insufficient quarks - required: ${convertMS(cardCost).dateString}${
          convertMS(cardCost).timeString
        }`
      );
    }
  };

  const destroyCard = (dateCreated: Date) => {
    if (localCards.length === 1) {
      addGameLog(`error... eliminating last probe violates Ai directive`);
      return;
    }
    const cardToDestroy = localCards.filter((obj: any) => {
      return obj.dateCreated === dateCreated;
    })[0];

    const index = localCards.findIndex((obj: any) => {
      return obj.dateCreated === dateCreated;
    });
    localCards[index].isDestroyed = true;

    addGameLog(`destroyed: ${cardToDestroy.name} x${cardToDestroy.timeRate}`);
    setDeadProbesCount((prev) => prev + 1);
    // remove card from localCards
    // const afterLocalCards = localCards.filter((obj: any) => {
    //   return obj.dateCreated.getTime() !== dateCreated.getTime();
    // });
    // setLocalCards((prev: any) => [...afterLocalCards]);
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

  const getAdjustedDate = () => {
    const currentTimeAsMs = Date.now();
    const adjustedTimeAsMs = currentTimeAsMs + jumpedDistance;
    return new Date(adjustedTimeAsMs);
  };

  const getAdjustedDateStr = () => {
    return getAdjustedDate().toLocaleDateString('en-US', dateOptions);
  };

  const jumpWarp = useCallback(() => {
    const currentTimeAsMs = getAdjustedDate().getTime();
    const adjustedTimeAsMs = currentTimeAsMs + jumpedDistance;
    const adjustedDateDestination = new Date(adjustedTimeAsMs).toLocaleDateString(
      'en-US',
      dateOptions
    );

    addGameLog(`${getAdjustedDateStr()} >>> ${adjustedDateDestination}`);
    addGameLog(`Jumping ahead...`);
    addGameLog(`Processing...`);

    setDarkQuarks((prev) => prev + displayQuarks);
    setJumpedDistance((prev) => prev + displayQuarks);
    setQuarks((probedMs) => 0);
  }, [displayQuarks, jumpedDistance]);

  const jumpBtnText = `${convertMS(displayQuarks).timeString} ${
    convertMS(displayQuarks).dateString
  }`;

  useEffect(() => {
    console.log('activeCards', activeCards);
    console.log('deadCards', deadCards);
  }, [localCards]);

  const deadCards = localCards.filter((card: any) => card.isDestroyed === true);
  const activeCards = localCards.filter((card: any) => card.isDestroyed === false);

  return (
    <Stack spacing={1} direction="column">
      <Typography sx={{ pt: 2 }} variant="h5">
        {getAdjustedDateStr()}
      </Typography>
      {/* Game Log */}
      <Divider sx={{ width: '100%', my: '10px' }} />
      <Box sx={{ width: '100%', textAlign: 'center', height: '75px', overflow: 'hidden' }}>
        {gameLog.length > 0 ? displayGameLog : null}
      </Box>
      <Typography variant="caption">probed - ready for time jump:</Typography>
      <Typography variant="h6"> {jumpBtnText}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          endIcon={<AccessTimeIcon />}
          sx={{ mx: 0.5 }}
          onClick={jumpWarp}
          variant="contained"
        >
          Jump
        </Button>
      </Box>
      <Typography variant="caption">{`jumped: ${convertMS(jumpedDistance).timeString}`}</Typography>
      <Typography variant="h4">
        RepliCATor Time Probes: {aliveProbesCount - deadProbesCount}/{cardCapacity}
      </Typography>
      <Typography variant="caption">Mutators</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button sx={{ mx: 0.5 }} onClick={() => null} variant="outlined">
          TimeRate
        </Button>
        <Button sx={{ mx: 0.5 }} onClick={() => null} variant="outlined">
          LifeSpan
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {localCards.length === 0 && <Button onClick={start}>Start</Button>}

        {/* Active */}
        {activeCards.map((card: any, i: number) => {
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Dead */}
        {deadCards.map((card: any, i: number) => {
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

export const calcReplicateCost = (lifeDuration: number, timeRate: number) => {
  return (lifeDuration / 5) * (timeRate / 50);
};

const centerFlexbox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};
