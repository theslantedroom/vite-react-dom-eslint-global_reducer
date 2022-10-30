import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';

import { Typography, Box, Paper, Stack, Slider } from '@mui/material';
import { ShowCardsRaw } from '../components/ShowCardsRaw';
import { CardBasic } from '../components/CardBasic';

export interface Props {
  name?: String;
  cards?: any[];
}
export const IdleTimeBoard: React.FC<Props> = ({ name = 'IdleTimeBoard', cards = [] }) => {
  const centerFlexbox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: '5px',
        ...centerFlexbox,
      }}
    >
      <Stack spacing={1} direction="column">
        {/* <Typography variant="h4">{`Time Travelers`}</Typography> */}

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
