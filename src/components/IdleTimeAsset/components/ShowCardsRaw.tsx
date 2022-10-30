import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { Typography, Box, Paper, Stack, Slider } from '@mui/material';

export interface Props {
  cards: any[];
}
export const ShowCardsRaw: React.FC<Props> = ({ cards = [] }) => {
  return <div> {cards.map((card) => JSON.stringify(card))}</div>;
};
