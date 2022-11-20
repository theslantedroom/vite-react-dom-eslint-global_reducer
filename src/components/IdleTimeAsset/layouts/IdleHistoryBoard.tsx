import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import TypeOut from 'react-typeout';

import { Typography, Box, Paper, Stack, Button, Divider } from '@mui/material';
import { genTimeTarget, yearMs, dayMs } from '../util/generateCard';
import { CardBasic } from '../components/CardBasic';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { convertMS } from '../hooks/useCardTimeData';
import { subject0, subjectLongDead, genTimeProbe } from '../util/generateCard';
import { useLocalstorageState } from 'rooks';
import { useSaveObjectLocalStorage } from '../hooks/useSaveObjectLocalStorage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltIcon from '@mui/icons-material/Bolt';
const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const gameOptionsDef = {
  isCloningFree: true,
  cardCapacity: 2,
};
export interface Props {
  cards?: any[];
  timeTargets?: any[];
}
export const IdleHistoryBoard: React.FC<Props> = ({ cards = [], timeTargets = [] }) => {
  const [gameOptions, setGameOptions] = useState(gameOptionsDef);
  const [localCards, setLocalCards] = useState<any>([]);
  const [quarks, setQuarks] = useState(0);
  const [selectedTimeProbe, setSelectedTimeProbe] = useState<any>(undefined);
  const [createdProbesCount, setCreatedProbesCount] = useState(0);
  const [deadProbesCount, setDeadProbesCount] = useState(0);
  const [darkQuarks, setDarkQuarks] = useState(0);
  const [jumpedDistance, setJumpedDistance] = useState(0);
  const [gameLog, setGameLog] = useState(['waiting.....']);
  const displayQuarks = quarks - darkQuarks;
  const [gameData, setGameData] = useState<any>({});

  const [isCollecting, setIsCollecting] = useState(false);
  const {} = useSaveObjectLocalStorage();

  const addQuarks = useCallback(
    (dateCreated: Date, amount: number, timeRate: number) => {
      setGameData((prev: any) => ({
        ...prev,
        [dateCreated.getTime()]: amount * timeRate,
      }));
    },
    [setGameData]
  );

  // Card Actions
  const activeCards = localCards.filter((card: any) => card.isDestroyed === false);
  const deadCards = localCards.filter((card: any) => card.isDestroyed === true);
  const lastDeadCards = useMemo(() => {
    return deadCards.slice(-2).reverse();
  }, [deadCards]);

  const spawnCards = (cards: any[]) => {
    const created = cards[0].dateCreated;
    // look if card exists in localCards. if so return
    if (
      localCards.find((card: any) => {
        return card.dateCreated.getTime() === created.getTime();
      })
    ) {
      return;
    }
    setLocalCards((prev: any) => [...prev, ...cards]);
  };

  const purchaseForQuarks = (cost: number) => {
    if (displayQuarks < cost) return false;
    addGameLog(
      `lost ${convertMS(cost).dateString}${
        convertMS(cost).timeString
      } quarks in replication process...
      `
    );
    setDarkQuarks((prev) => prev + cost);
    return true;
  };

  const replicateCard = (card: any, modifier: string) => {
    const isAtProbeMax = activeCards.length >= gameOptions.cardCapacity;
    if (isAtProbeMax) {
      addGameLog(
        `error... failed to replicate... maximum ${gameOptions.cardCapacity}/${gameOptions.cardCapacity} probes`
      );
      return;
    }
    const cardCost = gameOptions.isCloningFree
      ? 0
      : calcReplicateCost(card.lifeDuration, card.timeRate);
    const canAfford = purchaseForQuarks(cardCost);
    if (canAfford) {
      addGameLog(`job complete.... replicated ${card.name}`);
      let newCard = {
        ...card,
      };
      newCard.dateCreated = new Date();
      newCard.isDestroyed = false;
      newCard.description = [];
      const mutateScale = 1 + Math.random();

      if (modifier === 'isMutateTimeRate') {
        const mutationName = `${Math.round(mutateScale * 100)}% Speed`;

        const newTimeRate = Math.round(card.timeRate * mutateScale * 100) / 100;
        addGameLog(`mutating time rate.. ${card.name} ${card.timeRate}>${newTimeRate}`);
        newCard.name = mutationName;
        newCard.timeRate = newTimeRate;
        newCard.description.push(`mutated time travel rate...`);
      }

      if (modifier === 'isMutateDurability') {
        const mutationName = `${Math.round(mutateScale * 100)}% Duration`;
        const newDurability = Math.round(card.lifeDuration * mutateScale * 100) / 100;
        addGameLog(`mutating Durability rate.. ${card.name} ${card.timeRate}>${newDurability}`);
        newCard.name = mutationName;
        newCard.lifeDuration = newDurability;
        newCard.description.push(`mutated Durability...`);
      }

      const cards = [newCard];
      spawnCards([...cards]);
      setCreatedProbesCount((prev) => prev + 1);
    } else {
      addGameLog(
        `insufficient quarks - required: ${convertMS(cardCost).dateString}${
          convertMS(cardCost).timeString
        }`
      );
    }
  };

  const destroyCardFromLocalCards = useCallback(
    (dateCreated: Date) => {
      const cardToDestroy = localCards.filter((obj: any) => {
        return obj.dateCreated === dateCreated;
      })[0];
      const index = localCards.findIndex((obj: any) => {
        return obj.dateCreated === dateCreated;
      });
      if (!cardToDestroy) console.error('Failed to destroy card');
      localCards[index].isDestroyed = true;
      addGameLog(`destroyed: ${cardToDestroy.name} x${cardToDestroy.timeRate}`);
      setDeadProbesCount((prev) => prev + 1);
    },
    [localCards]
  );

  const destroyCard = useCallback((dateCreated: Date) => {
    console.log('-- destroyCard  --');
    setDeadProbesCount((prev) => prev + 1);
  }, []);

  // Util
  const getAdjustedDate = () => {
    const currentTimeAsMs = Date.now();
    const adjustedTimeAsMs = currentTimeAsMs + jumpedDistance;
    return new Date(adjustedTimeAsMs);
  };

  const getAdjustedDateStr = () => {
    return getAdjustedDate().toLocaleDateString('en-US', dateOptions);
  };

  // Board Actions
  const jumpWarp = useCallback(() => {
    const currentTimeAsMs = getAdjustedDate().getTime();
    setDeadProbesCount(0);
    setCreatedProbesCount(1);
    const adjustedTimeAsMs = currentTimeAsMs + jumpedDistance;
    const adjustedDateDestination = new Date(adjustedTimeAsMs).toLocaleDateString(
      'en-US',
      dateOptions
    );

    addGameLog(`${getAdjustedDateStr()} >>> ${adjustedDateDestination}`);
    addGameLog(`Jumping ahead...`);
    addGameLog(`Processing...`);
    if (!selectedTimeProbe) return;
    setDarkQuarks((prev) => prev + displayQuarks);
    setJumpedDistance((prev) => prev + displayQuarks);
    setQuarks((probedMs) => 0);
    setLocalCards([]);
    setTimeout(() => {
      selectedTimeProbe.dateCreated = new Date();
      setLocalCards([selectedTimeProbe]);
    }, 250);
  }, [displayQuarks, jumpedDistance]);

  const jumpBtnText = `${convertMS(displayQuarks).dateString} ${
    convertMS(displayQuarks).timeString
  } `;

  // Update gameData
  useEffect(() => {
    const localCardsInGameData = Object.values(gameData);
    const sum: any = localCardsInGameData.reduce((accumulator: any, value: any) => {
      return accumulator + value;
    }, 0);

    setQuarks(Math.round(sum));
  }, [gameData]);

  // GAME LOG
  const start = useCallback(() => {
    addGameLog(`Traveling an normal speed.`);
    addGameLog(`time travel probe activated....`);
    addGameLog(`initializing....`);
    const cards = [genTimeProbe()];
    spawnCards([...cards]);
    setCreatedProbesCount((prev) => prev + 1);
  }, []);

  // autostart
  // useEffect(() => {
  //   start();
  //   setCreatedProbesCount((prev) => prev + 1);
  // }, []);

  const addGameLog = useCallback(
    (text: string) => {
      setGameLog((prev) => {
        return [...prev, text];
      });
      logRef.current?.scrollIntoView();
    },
    [gameLog]
  );
  const logRef = useRef<HTMLDivElement>();
  const displayGameLog = useMemo(() => {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', height: '75px', overflow: 'auto' }}>
        {gameLog.length > 0 ? displayGameLog : null}

        {gameLog.map((log, i) => {
          const isTopLog = true;
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
        })}
        <Box ref={logRef} />
      </Box>
    );
  }, [gameLog]);

  const gameStartedDate = useRef(new Date());
  const jumpedText = 'traveled';
  const postJumpText = '-1h 0-1m 0-1s -1 years, 364 days';
  const chargeText = jumpBtnText == postJumpText ? jumpedText : jumpBtnText;
  const nowMs = Date.now();
  const adjustedTimeAsMs = nowMs + jumpedDistance;
  const targetDateMs = gameStartedDate.current.getTime() + 60000;
  const targetDateGoal = new Date(targetDateMs).toLocaleDateString('en-US', dateOptions);
  const reachedGoal = adjustedTimeAsMs > targetDateMs;

  useEffect(() => {
    if (reachedGoal) setGameOptions({ ...gameOptions, cardCapacity: 3 });
  }, [reachedGoal]);

  return (
    <Stack spacing={1} direction="column">
      <Typography sx={{ pt: 2 }} variant="h2">
        {getAdjustedDateStr()}
      </Typography>
      <Typography sx={{ pt: 2 }} variant="h5">
        {reachedGoal ? 'Reached Target Point - More Soon' : `Target Date: ${targetDateGoal}`}
      </Typography>
      {/* Game Log */}
      <Divider sx={{ width: '100%', my: '10px' }} />
      {displayGameLog}

      <Typography variant="h4">{`Probes: ${activeCards.length}/${gameOptions.cardCapacity}`}</Typography>
      <Typography variant="h6">
        {`${activeCards.length} collecting: `}
        <ElectricBoltIcon sx={{ position: 'relative', top: '5px' }} />
      </Typography>

      <Box>
        {isCollecting && <Typography variant="h5">Warp Distance</Typography>}
        <Typography variant="h6">
          {isCollecting
            ? ``
            : `${
                localCards.length === 0 ? 'Launch a time probe to begin collecting time units.' : ''
              }`}
          <ElectricBoltIcon sx={{ position: 'relative', top: '5px' }} />: {chargeText}
        </Typography>
      </Box>
      <Typography variant="caption">{`total jumped: ${convertMS(jumpedDistance).dateString} ${
        convertMS(jumpedDistance).timeString
      } `}</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {localCards.length === 0 && (
          <Button variant="contained" color="success" onClick={start}>
            Launch Probe at 1x normal time rate....
          </Button>
        )}

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
              duplicate={(modifier: 'isMutateTimeRate' | 'isMutateDurability') =>
                replicateCard(card, modifier)
              }
              destroyCard={() => destroyCard(card.dateCreated)}
              selectCard={() => setSelectedTimeProbe(card)}
              selectedCard={selectedTimeProbe}
              gameOptions={gameOptions}
              localCards={localCards}
              activeCards={activeCards}
              jumpWarp={jumpWarp}
            />
          );
        })}
      </Box>
      <Divider sx={{ width: '100%', my: '10px' }} />
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
