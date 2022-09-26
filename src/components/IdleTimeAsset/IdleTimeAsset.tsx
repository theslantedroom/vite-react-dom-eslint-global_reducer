import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Divider } from '@mui/material';

export interface Props {
  name?: String;
  description?: String;
  dateCreated?: Date;
  timeRate: number;
  creates?: string;
  counterSpeedMs?: number;
}
export const IdleTimeAsset: React.FC<Props> = ({
  name = undefined,
  description = undefined,
  dateCreated = undefined,
  timeRate = 0.001,
  counterSpeedMs = 100,
}) => {
  const realTimeOnRender = useRef(new Date());
  const startCalcOnMount = useRef(!dateCreated);
  const [hover, setHover] = useState<boolean>(false);

  const [nowDate, setNowDate] = useState(new Date());
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

  const timePassed = useMemo(() => {
    const isReverseTime = timeRate < 0;

    const startCalcDate = dateCreated ? dateCreated : realTimeOnRender.current;
    const msPassed = nowDate.getTime() - startCalcDate.getTime();
    const totalAccumulatedInt = msPassed * timeRate;
    console.log('totalAccumulatedInt', msPassed, totalAccumulatedInt);
    const totalAccumulated = totalAccumulatedInt.toFixed(2);
    const futureDate = new Date(nowDate.getTime() + totalAccumulatedInt);
    const pastDate = new Date(nowDate.getTime() - msPassed + totalAccumulatedInt);
    // @ts-ignore
    const progressToNext = parseInt((totalAccumulated % 1).toFixed(2).substring(2));
    const totalAccumulatedText = totalAccumulated.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const history = convertMiliseconds(msPassed).textString;
    return {
      age: `card age ms: ${msPassed}`,
      multiMs: `time rate ${timeRate}x`,
      totalAccumulated: totalAccumulated,
      totalAccumulatedText,
      history,
      progressToNext,
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

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

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
      <Typography variant="h5">{name}</Typography>
      <Typography variant="caption" sx={{ textAlign: 'center' }}>
        {description}
      </Typography>

      <Box sx={{ padding: 1, ...centerFlexbox }}>
        <Typography variant="h4">{`True Time Since:`}</Typography>
        {timePassed.history}
        {/* <Typography>{timePassed.progressToNext}</Typography> */}
      </Box>

      <Box sx={{ padding: 1, ...centerFlexbox }}>
        <Typography variant="h4">{timePassed.totalAccumulatedText}</Typography>
        <Typography>{timePassed.multiMs}</Typography>
        <Typography>{timePassed.age}</Typography>
      </Box>

      <Typography variant="h4">{`Calculated Date:`}</Typography>

      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {timePassed?.isReverseTime
          ? timePassed?.pastDate.toLocaleDateString('en-US', options)
          : timePassed?.futureDate.toLocaleDateString('en-US', options)}
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        traveling: true
      </Typography>
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
        <Typography variant="body1">{`years: ${years}`}</Typography>
        <Typography variant="body1">{`days: ${days}`}</Typography>
        <Typography variant="body1">{`hours: ${hours}`}</Typography>
        <Typography variant="body1">{`minutes: ${minutes}`}</Typography>
        <Typography variant="body1">{`seconds: ${seconds}`}</Typography>
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
