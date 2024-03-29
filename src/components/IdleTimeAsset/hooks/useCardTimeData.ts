import React, { useState, useEffect, useRef, useMemo } from 'react';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

export const useCardTimeData = (
  rateReturn: number,
  timeRate: number,
  dateCreated: any,
  counterSpeedMs: number,
  lifeDuration: number
) => {
  const [rateReturnCounter, setRateReturnCounter] = useState(rateReturn);
  const [rate, setRate] = useState(timeRate);
  const [nowDate, setNowDate] = useState(new Date());
  const realTimeOnRender = useRef(new Date());

  const timeData = useMemo(() => {
    // runs each loop
    setRateReturnCounter(rateReturnCounter - 1);
    if (rateReturnCounter === 0) {
      if (rate > 1) setRate(rate - 1 * 100 < 0 ? 0 : rate - 1 * 100);
      if (rate < 1) setRate(rate + 1 * 100 > 0 ? 0 : rate + 1 * 100);
      setRateReturnCounter(rateReturn);
    }
    const isReverseTime = rate < 0;
    const nowMs = nowDate.getTime();
    const startCalcDate = dateCreated ? dateCreated : realTimeOnRender.current;
    const msPassed = nowMs - startCalcDate.getTime();
    const totalAccumulatedInt = msPassed * rate;
    const totalAccumulated = totalAccumulatedInt.toFixed(2);
    const futureMs = nowMs + totalAccumulatedInt - msPassed;
    const futureDate = new Date(futureMs);
    const pastDate = new Date(nowMs - msPassed + totalAccumulatedInt);
    const msTimeCreated = dateCreated.getTime();
    const isAlive = futureMs < lifeDuration + msTimeCreated;
    const totalAccumulatedText = totalAccumulated.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const realTimePast = convertMS(msPassed);
    const isInvalidDate = isReverseTime
      ? pastDate.toLocaleDateString('en-US', dateOptions)
      : futureDate.toLocaleDateString('en-US', dateOptions) === 'Invalid Date';

    const willDieBeforeFirstFrame = lifeDuration / 10 / timeRate < counterSpeedMs;
    return {
      msPassed: msPassed,
      ageFormatted: `${numberWithCommas(msPassed)}`,
      timeRate: timeRate,
      timeRateStr: `${numberWithCommas(rate)}`,
      totalAccumulated: totalAccumulated,
      totalAccumulatedText: `UTC timestamp ms: ${totalAccumulatedText}`,
      realTimePast: realTimePast,
      dateCreated: dateCreated?.toLocaleDateString('en-US', dateOptions),
      futureDate,
      pastDate,
      isReverseTime,
      timeLivedMs: futureMs - dateCreated,
      timeLived: convertMS(futureMs - dateCreated),
      calculatedDate: isReverseTime
        ? pastDate.toLocaleDateString('en-US', dateOptions)
        : futureDate.toLocaleDateString('en-US', dateOptions),
      lifeDuration: convertMS(lifeDuration),
      isAlive: isAlive,
      isInvalidDate,
      willDieBeforeFirstFrame,
    };
  }, [nowDate]);

  useEffect(() => {
    const counter = setInterval(() => {
      const newNow = new Date();
      setNowDate(newNow);
    }, counterSpeedMs);
    return function cleanup() {
      clearInterval(counter);
    };
  }, []);

  return { timeData, rate, setRate };
};

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function convertMS(milliseconds: number) {
  if (milliseconds < 0)
    return {
      day: 0,
      hour: 0,
      minute: 0,
      seconds: 0,
      ms: 0,
      string: ``,
      dateString: `launch probe to begin...`,
      timeString: ``,
    };
  var years, day, hour, minute, seconds, total_hours, total_minutes, total_seconds;
  total_seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(total_seconds / 60);
  seconds = total_seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  total_minutes = Math.floor(total_seconds / 60);

  total_hours = Math.floor(total_minutes / 60);

  years = Math.floor(total_hours / 24 / 365);
  day = Math.floor(total_hours / 24 - years * 365);
  const data = {
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds,
    ms: milliseconds,
    string: `${years ? `${numberWithCommas(years)} years,` : ''} ${day ? `${day} days,` : ''} ${
      hour ? `${hour}h` : ''
    } ${`${minute < 10 ? '0' : ''}${minute}m`} ${`${seconds < 10 ? '0' : ''}${seconds}s`}`,
    dateString: `${years ? `${numberWithCommas(years)} years,` : ''} ${day ? `${day} days` : ''}`,
    timeString: `${hour ? `${hour}h` : ''} ${`${minute < 10 ? '0' : ''}${minute}m`} ${`${
      seconds < 10 ? '0' : ''
    }${seconds}s`}`,
  };
  return data;
}
