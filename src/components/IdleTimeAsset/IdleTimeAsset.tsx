import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Slider } from '@mui/material';
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
  description?: String;
  dateCreated?: Date;
  timeRate: number;
  creates?: string;
  counterSpeedMs?: number;
  minTimeRate?: number;
  maxTimeRate?: number;
  rateSliderStep?: number;
  rateReturn?: number;
}
export const IdleTimeAsset: React.FC<Props> = ({
  name = undefined,
  description = undefined,
  dateCreated = undefined,
  timeRate = 1,
  counterSpeedMs = 100,
  minTimeRate = -10000,
  maxTimeRate = 10000,
  rateSliderStep = 1,
  rateReturn = -1,
}) => {
  const realTimeOnRender = useRef(new Date());
  const startCalcOnMount = useRef(!dateCreated);
  const [hover, setHover] = useState<boolean>(false);

  const [nowDate, setNowDate] = useState(new Date());
  const [rate, setRate] = useState(timeRate);
  const [rateReturnCounter, setRateReturnCounter] = useState(rateReturn);
  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    const counter = setInterval(() => {
      const newNow = new Date();
      setNowDate(newNow);
    }, counterSpeedMs);
    return function cleanup() {
      clearInterval(counter);
    };
  }, []);

  const timeData = useMemo(() => {
    // runs each loop
    setRateReturnCounter(rateReturnCounter - 1);
    if (rateReturnCounter === 0) {
      if (rate > 1) setRate(rate - 1 * 100 < 0 ? 0 : rate - 1 * 100);
      if (rate < 1) setRate(rate + 1 * 100 > 0 ? 0 : rate + 1 * 100);
      setRateReturnCounter(rateReturn);
    }

    const isReverseTime = rate < 0;

    const startCalcDate = dateCreated ? dateCreated : realTimeOnRender.current;
    const msPassed = nowDate.getTime() - startCalcDate.getTime();
    const totalAccumulatedInt = msPassed * rate;
    const totalAccumulated = totalAccumulatedInt.toFixed(2);
    const futureMs = totalAccumulatedInt - msPassed - startCalcDate.getTime();
    const futureDate = new Date(nowDate.getTime() + totalAccumulatedInt - msPassed);
    const pastDate = new Date(nowDate.getTime() - msPassed + totalAccumulatedInt);

    const totalAccumulatedText = totalAccumulated.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const realTimePast = convertMiliseconds(msPassed).textString;
    return {
      age: `card age ms: ${msPassed}`,
      timeRate: `${rate}x`,
      totalAccumulated: totalAccumulated,
      totalAccumulatedText,
      realTimePast,
      dateCreated: dateCreated?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      futureDate,
      pastDate,
      isReverseTime,
    };
  }, [nowDate]);
  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const min = -100,
    max = 100;

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        ...centerFlexbox,
      }}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
    >
      {startCalcOnMount.current ? <Typography>{`started Calc On Mount Date`}</Typography> : null}
      <Typography variant="h4">{name}</Typography>
      <Typography> {timeData.dateCreated}</Typography>
      <Typography variant="caption" sx={{ textAlign: 'center' }}>
        {description || '-'}
      </Typography>

      <Box sx={{ padding: 1, ...centerFlexbox }}>
        <Typography variant="h5">{`Real Time Past:`}</Typography>
        {timeData.realTimePast}
      </Box>

      <Box sx={{ padding: 1, ...centerFlexbox }}>
        <Typography>{`Internal Stats`}</Typography>

        <Typography variant="body2">{timeData.totalAccumulatedText}</Typography>
        <Typography>{timeData.age}</Typography>
      </Box>

      <Typography variant="h4">{`Calculated Date:`}</Typography>

      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {timeData?.isReverseTime
          ? timeData?.pastDate.toLocaleDateString('en-US', dateOptions)
          : timeData?.futureDate.toLocaleDateString('en-US', dateOptions)}
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Time Rate
      </Typography>
      <Typography sx={{ paddingBottom: 1 }}>{timeData.timeRate}</Typography>

      <Box width={300}>
        <Slider
          max={maxTimeRate}
          min={minTimeRate}
          value={rate}
          step={rateSliderStep}
          scale={(x) => x - 200}
          onChange={(e: any) => setRate(e.target.value)}
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="off"
        />
      </Box>
    </Paper>
  );
};

function convertMiliseconds(miliseconds: number) {
  var years, days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = Math.floor(miliseconds / 1000);
  total_minutes = Math.floor(total_seconds / 60);
  total_hours = Math.floor(total_minutes / 60);
  years = Math.floor(total_hours / 24 / 365);
  days = Math.floor(total_hours / 24 - years * 365);

  seconds = total_seconds % 60;
  minutes = total_minutes % 60;
  hours = total_hours % 24;

  return {
    breakdown: { d: days, h: hours, m: minutes, s: seconds },
    textString: (
      <Stack spacing={1} direction="row">
        <Typography variant="body1">{`${years} years`}</Typography>
        <Typography variant="body1"> - </Typography>
        <Typography variant="body1">{`${days} days`}</Typography>
        <Typography variant="body1"> - </Typography>
        <Typography variant="body1">{`${hours} hours`}</Typography>
        <Typography variant="body1"> - </Typography>
        <Typography variant="body1">{`${minutes} minutes`}</Typography>
        <Typography variant="body1"> - </Typography>
        <Typography variant="body1">{`${seconds} seconds`}</Typography>
      </Stack>
    ),
  };
}

function getDecimalPart(num: number) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number(decimalStr);
}
