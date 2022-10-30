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
  rateReturn: any,
  timeRate: any,
  dateCreated: any,
  counterSpeedMs: any
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

    const startCalcDate = dateCreated ? dateCreated : realTimeOnRender.current;
    const msPassed = nowDate.getTime() - startCalcDate.getTime();
    const totalAccumulatedInt = msPassed * rate;
    const totalAccumulated = totalAccumulatedInt.toFixed(2);
    const futureMs = totalAccumulatedInt - msPassed - startCalcDate.getTime();
    const futureDate = new Date(nowDate.getTime() + totalAccumulatedInt - msPassed);
    const pastDate = new Date(nowDate.getTime() - msPassed + totalAccumulatedInt);

    const totalAccumulatedText = totalAccumulated.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const realTimePast = parseRealTimePast(msPassed);
    return {
      age: `${msPassed}`,
      ageFormatted: `${numberWithCommas(msPassed)}`,
      timeRate: `${rate}x`,
      totalAccumulated: totalAccumulated,
      totalAccumulatedText: `UTC timestamp ms: ${totalAccumulatedText}`,
      realTimePast: realTimePast,
      dateCreated: dateCreated?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      futureDate,
      pastDate,
      isReverseTime,
      calculatedDate: isReverseTime
        ? pastDate.toLocaleDateString('en-US', dateOptions)
        : futureDate.toLocaleDateString('en-US', dateOptions),
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

function parseRealTimePast(miliseconds: number) {
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
    breakdown: { y: years, d: days, h: hours, m: minutes, s: seconds },
    textString: `${years}-years ${days}-days ${hours}h:${minutes}m:${seconds}s`,
  };
}

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
